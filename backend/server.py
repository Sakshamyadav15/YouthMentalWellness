import io
import os
import tempfile
import subprocess
from typing import List

import numpy as np
import torch
import librosa
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoFeatureExtractor, AutoModelForAudioClassification


MODEL_NAME = os.environ.get("AUDIO_MODEL", "superb/wav2vec2-large-superb-er")

# Load model & feature extractor once on startup (CPU)
extractor = AutoFeatureExtractor.from_pretrained(MODEL_NAME)
model = AutoModelForAudioClassification.from_pretrained(MODEL_NAME)
model.eval()

app = FastAPI(title="Emotion Inference API", version="1.0.0")

# CORS (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmotionScore(BaseModel):
    label: str
    score: float  # percentage 0-100


class PredictionResponse(BaseModel):
    primary: str
    confidence: float  # percentage 0-100
    emotions: List[EmotionScore]


def _ensure_ffmpeg_available():
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        return True
    except Exception:
        return False


def read_audio_any_to_wav_16k_mono(file_bytes: bytes) -> np.ndarray:
    """
    Accepts raw bytes (likely webm/opus from browser). Converts to WAV 16k mono via ffmpeg,
    then loads as numpy float32 array at 16k.
    Requires ffmpeg to be installed on the system.
    """
    if not _ensure_ffmpeg_available():
        raise RuntimeError("ffmpeg is not installed or not in PATH. Install ffmpeg to decode webm/opus.")

    with tempfile.TemporaryDirectory() as tmpdir:
        in_path = os.path.join(tmpdir, "input")  # extension not required for ffmpeg
        out_path = os.path.join(tmpdir, "output.wav")
        with open(in_path, "wb") as f:
            f.write(file_bytes)

        # Convert to WAV 16k mono PCM S16LE
        cmd = [
            "ffmpeg", "-y", "-i", in_path,
            "-ac", "1", "-ar", "16000", "-f", "wav", out_path
        ]
        proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if proc.returncode != 0:
            raise RuntimeError(f"ffmpeg conversion failed: {proc.stderr.decode(errors='ignore')}")

        # Load wav 16k mono
        audio, sr = librosa.load(out_path, sr=16000)
        return audio


def predict_emotions_from_audio(audio: np.ndarray) -> PredictionResponse:
    # Prepare inputs for model
    inputs = extractor(audio, sampling_rate=16000, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits  # (1, num_labels)
        probs = torch.softmax(logits, dim=-1).cpu().numpy()[0]

    # Top-k emotions (all sorted)
    id2label = model.config.id2label
    indices = np.argsort(-probs)  # descending
    emotions = [
        EmotionScore(label=id2label[int(i)], score=float(round(probs[int(i)] * 100.0, 2)))
        for i in indices
    ]
    primary = emotions[0]
    return PredictionResponse(primary=primary.label, confidence=primary.score, emotions=emotions)


@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    try:
        data = await file.read()
        audio = read_audio_any_to_wav_16k_mono(data)
        result = predict_emotions_from_audio(audio)
        return result
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process audio: {e}")


@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL_NAME}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
