import express from "express";
import multer from "multer";
import cors from "cors";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import "dotenv/config";
import { RAN_COLOURS } from "./ranColours.ts";

const app = express();
app.use(cors());
app.use(express.json());

// ===== Types =====
type Session = {
  id: string;
  studentId: string;
  grid: string[];
  durationMs: number;
  status: "created" | "audio_uploaded" | "scoring" | "scored" | "error";
  audioPath?: string;
  result?: any;
};

type AssemblyAIUploadResponse = {
  upload_url: string;
};

type AssemblyAITranscriptResponse = {
  id: string;
  status: "queued" | "processing" | "completed" | "error";
  text?: string;
  error?: string;
  words?: {
    text: string;
    start: number;
    end: number;
    confidence: number;
  }[];
};

const store = new Map<string, Session>();

// ===== Multer for audio uploads =====
const upload = multer({ dest: path.join(process.cwd(), "uploads") });

// ===== API Routes =====

// 1. Create new test session
app.post("/api/ran/sessions", (req, res) => {
  const { studentId, grid, durationMs } = req.body;
  const id = randomUUID();
  store.set(id, { id, studentId, grid, durationMs, status: "created" });
  res.json({ id, uploadUrl: null });
});

// 2. Upload audio file
app.post("/api/ran/sessions/:id/audio", upload.single("file"), (req, res) => {
  const s = store.get(req.params.id);
  if (!s) return res.sendStatus(404);
  s.audioPath = req.file!.path;
  s.status = "audio_uploaded";
  res.json({ ok: true });
});

// 3. Start scoring (AssemblyAI)
app.post("/api/ran/sessions/:id/score", async (req, res) => {
  const s = store.get(req.params.id);
  if (!s || !s.audioPath) return res.sendStatus(400);
  s.status = "scoring";

  (async () => {
    try {
      const apiKey = process.env.ASSEMBLYAI_API_KEY!;
      if (!apiKey) throw new Error("Missing ASSEMBLYAI_API_KEY");

      // 1. Upload audio file
      const uploadRes = (await fetch("https://api.assemblyai.com/v2/upload", {
        method: "POST",
        headers: {
          authorization: apiKey,
          "transfer-encoding": "chunked",
        },
        body: fs.createReadStream(s.audioPath!),
      }).then((r) => r.json())) as AssemblyAIUploadResponse;

      const audioUrl = uploadRes.upload_url;

      // 2. Request transcription
      const transcriptRes = (await fetch(
        "https://api.assemblyai.com/v2/transcript",
        {
          method: "POST",
          headers: {
            authorization: apiKey,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            audio_url: audioUrl,
            word_boost: [], // optional
            punctuate: true,
            format_text: true,
          }),
        }
      ).then((r) => r.json())) as AssemblyAITranscriptResponse;

      const transcriptId = transcriptRes.id;

      // 3. Poll until finished
      let transcript: AssemblyAITranscriptResponse;
      for (;;) {
        await new Promise((r) => setTimeout(r, 3000));
        transcript = (await fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          { headers: { authorization: apiKey } }
        ).then((r) => r.json())) as AssemblyAITranscriptResponse;

        if (
          transcript.status === "completed" ||
          transcript.status === "error"
        ) {
          break;
        }
      }

      if (transcript.status === "error") {
        throw new Error("Transcription failed: " + transcript.error);
      }

      console.log("AssemblyAI transcript:", transcript.text);

      // Convert transcript words to our format
      const words =
        transcript.words?.map((w) => ({
          text: w.text.toLowerCase(),
          start: w.start / 1000,
          end: w.end / 1000,
          confidence: w.confidence,
        })) || [];

      const result = scoreRAN(s.grid, words, s.durationMs);
      s.result = { metrics: result };
      s.status = "scored";
    } catch (e) {
      console.error("Scoring failed:", e);
      s.status = "error";
    }
  })();

  res.json({ ok: true, status: "scoring" });
});

// 4. Get session result
app.get("/api/ran/sessions/:id", (req, res) => {
  const s = store.get(req.params.id);
  if (!s) return res.sendStatus(404);
  res.json(s);
});

// ===== Simple scoring function =====
function normalize(word: string): string {
    word = word.toLowerCase().replace(/[^a-z]/g, ""); // strip punctuation
    const synonym = RAN_COLOURS.find((c) => c.synonyms.includes(word));
    return synonym ? synonym.name : word;
  }
  
  function levenshtein(a: string, b: string): number {
    const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );
  
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
        else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    return dp[a.length][b.length];
  }
  
  function isCloseMatch(a: string, b: string, maxDist = 1): boolean {
    if (a === b) return true;
    return levenshtein(a, b) <= maxDist;
  }
  
  // ---- Scoring ----
  export function scoreRAN(
    expectedGrid: string[],
    spokenWords: { text: string; start: number; end: number; confidence: number }[],
    durationMs: number
  ) {
    const expected = expectedGrid.map(normalize);
    const spoken = spokenWords.map((w) => normalize(w.text));
  
    // DP table for alignment
    const dp: number[][] = Array(expected.length + 1)
      .fill(null)
      .map(() => Array(spoken.length + 1).fill(0));
  
    for (let i = 0; i <= expected.length; i++) dp[i][0] = i;
    for (let j = 0; j <= spoken.length; j++) dp[0][j] = j;
  
    for (let i = 1; i <= expected.length; i++) {
      for (let j = 1; j <= spoken.length; j++) {
        if (isCloseMatch(expected[i - 1], spoken[j - 1])) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }
  
    // Backtrack to compute correct/mistakes
    let i = expected.length,
      j = spoken.length;
    let correct = 0;
    const mistakes: { expected: string; got: string; index: number }[] = [];
  
    while (i > 0 && j > 0) {
      if (isCloseMatch(expected[i - 1], spoken[j - 1])) {
        correct++;
        i--;
        j--;
      } else if (dp[i][j] === dp[i - 1][j - 1] + 1) {
        mistakes.push({
          expected: expected[i - 1],
          got: spoken[j - 1],
          index: i - 1,
        });
        i--;
        j--;
      } else if (dp[i][j] === dp[i - 1][j] + 1) {
        mistakes.push({
          expected: expected[i - 1],
          got: "(missing)",
          index: i - 1,
        });
        i--;
      } else {
        mistakes.push({
          expected: "(extra)",
          got: spoken[j - 1],
          index: j - 1,
        });
        j--;
      }
    }
  
    const total = expected.length;
    const errors = mistakes.length;
    const accuracy = correct / total;
    const itemsPerMinute = total / (durationMs / 60000);
  
    return {
      total,
      correct,
      accuracy,
      errors,
      itemsPerMinute,
      mistakes,
      spokenWords,
    };
  }
// ===== Start server =====
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`RAN Test API listening on http://localhost:${PORT}`);
});