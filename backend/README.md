# Backend (VM) setup and integration

## 1) Provision a VM
- Ubuntu 22.04 (2 vCPU, 4GB RAM works for CPU inference)
- Open inbound TCP: 80/443 (if using reverse proxy) or 8000 directly
- Install system deps: ffmpeg (required to decode webm/opus from browser)

## 2) Install Python deps
```bash
sudo apt update && sudo apt install -y ffmpeg python3-pip
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

## 3) Run the API
```bash
export AUDIO_MODEL="superb/wav2vec2-large-superb-er"  # optional
python backend/server.py  # or: uvicorn backend.server:app --host 0.0.0.0 --port 8000
```

Check health:
```bash
curl http://<VM_IP>:8000/health
```

## 4) Configure the frontend
- Set the backend URL for the app:
  - Option A (env): create `.env` in project root with:
    ```
    VITE_BACKEND_URL=http://<VM_IP>:8000
    ```
  - Option B (code): edit `src/config.ts` and set `BACKEND_URL`.

The `MicrophoneButton` will send audio to `POST /predict` and navigate to `/results` with the response.

## 5) If you want to run your provided CLI script on the VM
Create `ser_cpu.py` on the VM:
```python
import torch
import librosa
from transformers import AutoFeatureExtractor, AutoModelForAudioClassification
import sys

MODEL_NAME = "superb/wav2vec2-large-superb-er"
extractor = AutoFeatureExtractor.from_pretrained(MODEL_NAME)
model = AutoModelForAudioClassification.from_pretrained(MODEL_NAME)
model.eval()

def predict_emotion(file_path):
    audio, _ = librosa.load(file_path, sr=16000)
    inputs = extractor(audio, sampling_rate=16000, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits
    pred_id = torch.argmax(logits, dim=-1).item()
    label = model.config.id2label[pred_id]
    return label

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ser_cpu.py <path_to_wav>")
        sys.exit(1)
    file_path = sys.argv[1]
    emotion = predict_emotion(file_path)
    print(f"Predicted emotion: {emotion}")
```
Usage:
```bash
python ser_cpu.py /path/to/file.wav
```

## 6) Production tips
- Put a reverse proxy (Nginx) in front of Uvicorn; enable HTTPS
- Restrict CORS to your domain
- Run Uvicorn/Gunicorn as a service (systemd)
- Cache model on disk (first run downloads weights)
