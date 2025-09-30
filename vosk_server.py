from vosk import Model, KaldiRecognizer
import sys, json, wave, os
from flask import Flask, request, jsonify

app = Flask(__name__)
model = Model("models/vosk-model-small-en-us-0.15")

@app.route("/stt", methods=["POST"])
def stt():
    audio_path = request.json["path"]
    wf = wave.open(audio_path, "rb")
    rec = KaldiRecognizer(model, wf.getframerate())

    results = []
    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            results.append(json.loads(rec.Result()))
    results.append(json.loads(rec.FinalResult()))
    text = " ".join(r.get("text", "") for r in results)

    return jsonify({"text": text})

if __name__ == "__main__":
    app.run(port=5001)