import React, { useEffect, useMemo, useRef, useState } from "react";
import { RAN_COLOURS } from "../lib/ranColours";

const FIXED_GRID = [
    "blue","red","orange","yellow","green","red","green","red",
    "black","gray","black","green","purple","black","orange","red",
    "yellow","gray","gray","gray","orange","yellow","orange","blue",
    "gray","black","yellow","black","green","red","red","orange",
    "black","black","purple","green","orange","purple","purple","purple",
    "gray","green","red","yellow","green","yellow","black","orange",
  ];


export default function RANTest() {
    const [grid] = useState(() => FIXED_GRID);
  const expected = useMemo(() => grid, [grid]);

  const [perm, setPerm] = useState<"idle" | "granted" | "denied">("idle");
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);

  const mr = useRef<MediaRecorder | null>(null);
  const chunks = useRef<BlobPart[]>([]);
  const t0 = useRef<number>(0);
  const timer = useRef<number | undefined>(undefined);

  async function requestMic() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setPerm("granted");
    } catch {
      setPerm("denied");
      alert("Microphone permission is required to take this test.");
    }
  }

  function start() {
    chunks.current = [];
    setElapsed(0);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const rec = new MediaRecorder(stream, {
          mimeType: "audio/webm;codecs=opus",
        });
        mr.current = rec;
        rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          setBlob(new Blob(chunks.current, { type: "audio/webm" }));
          clearInterval(timer.current);
          setRecording(false);
        };
        rec.start();
        t0.current = Date.now();
        setRecording(true);
        timer.current = window.setInterval(
          () => setElapsed(Date.now() - t0.current),
          100
        );
      })
      .catch(() => alert("Could not start recording"));
  }

  function stop() {
    mr.current?.stop();
  }

  async function submit() {
    if (!blob) return;
    setBusy(true);
    try {
      // 1) create session (store grid + duration)
      const s = await fetch("/api/ran/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: "demo-student",
          ranType: "colours",
          grid: expected,
          durationMs: elapsed,
        }),
      }).then((r) => r.json()); // {id, uploadUrl}

      // 2) upload audio
      const uploadUrl = s.uploadUrl || `/api/ran/sessions/${s.id}/audio`;
      const fd = new FormData();
      fd.append("file", blob, "ran.webm");
      await fetch(uploadUrl, { method: "POST", body: fd });

      // 3) trigger scoring
      await fetch(`/api/ran/sessions/${s.id}/score`, { method: "POST" });

      // 4) poll for result
      let result: any;
      for (;;) {
        await new Promise((r) => setTimeout(r, 1000));
        const data = await fetch(`/api/ran/sessions/${s.id}`).then((r) =>
          r.json()
        );
        if (data.status === "scored") {
          result = data;
          break;
        }
        if (data.status === "error") throw new Error("Scoring failed");
      }

      const metrics = result.result.metrics;

      alert(`Speed: ${metrics.itemsPerMinute.toFixed(1)} items/min
Accuracy: ${(metrics.accuracy * 100).toFixed(0)}%
Errors: ${metrics.errors}`);
    } catch (e) {
      console.error(e);
      alert("Submit failed");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    requestMic();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r p-6">
        <h1 className="font-bold text-2xl">AdaptEd</h1>
        <nav className="mt-6 space-y-2">
          <a href="/homepage" className="hover:underline">
            🏠 Homepage
          </a>
          <a href="#" className="hover:underline">
            📁 Resource Management
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold mb-2">
          Rapid Automatized Naming (RAN) Test
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Please enable microphone access before starting this test.
        </p>

        <div
          className="grid gap-12 mb-10"
          style={{ gridTemplateColumns: `repeat(${8},1fr)` }}
        >
          {grid.map((name, i) => {
            const hex = RAN_COLOURS.find((c) => c.name === name)!.hex;
            return (
              <div
                key={i}
                className="w-16 h-16 rounded-full"
                style={{ backgroundColor: hex }}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xl">
            {recording ? `⏱ ${(elapsed / 1000).toFixed(1)}s` : "⏱ 0.0s"}
          </div>
          {perm !== "granted" && (
            <button
              onClick={requestMic}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Allow Mic
            </button>
          )}
          {!recording && perm === "granted" && (
            <button
              onClick={start}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Start
            </button>
          )}
          {recording && (
            <button
              onClick={stop}
              className="px-4 py-2 bg-orange-600 text-white rounded"
            >
              Stop
            </button>
          )}
          {!recording && blob && (
            <button
              disabled={busy}
              onClick={submit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {busy ? "Submitting…" : "Submit"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}