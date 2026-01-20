import requests
from fastapi import APIRouter, HTTPException, UploadFile, File
from schemas.chat import ChatRequest
from faster_whisper import WhisperModel
import tempfile
import shutil

# router = APIRouter(prefix="/api", tags=["Chat"])
router = APIRouter(tags=["Chat"])

N8N_WEBHOOKS = {
    "marketing": "http://n8n:5678/webhook/marketing-chat",
    "sales": "http://n8n:5678/webhook/sales-chat",
    "hr": "http://n8n:5678/webhook/hr-chat",
}

model = WhisperModel("small", device="cpu", compute_type="int8")

@router.post("/stt")
async def speech_to_text(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp:
        shutil.copyfileobj(file.file, temp)
        temp_path = temp.name

    segments, info = model.transcribe(temp_path, language="ko")

    text = ""
    for segment in segments:
        text += segment.text + " "

    return {
        "text": text.strip(),
        "language": info.language
    }


@router.post("/chat")
def chat(req: ChatRequest):
    department = req.department.lower()

    if department not in N8N_WEBHOOKS:
        raise HTTPException(status_code=400, detail="Unknown department")

    try:
        res = requests.post(
            N8N_WEBHOOKS[department],
            json={
                "sessionId": req.sessionId,
                "message": req.message
            },
            timeout=60
        )
        res.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=str(e))

    data = res.json()
    return {"reply": data.get("reply", "응답이 없습니다.")}
