import requests
import tempfile
import shutil
from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from sqlalchemy.orm import Session
from deps import get_db
from crud import save_chat, get_recent_questions
from schemas.chat import ChatRequest
from models import ChatHistory
from faster_whisper import WhisperModel

# router = APIRouter(prefix="/api", tags=["Chat"])
router = APIRouter(tags=["Chat"])

N8N_WEBHOOKS = {
    "marketing": "http://n8n:5678/webhook/marketing-chat",
    "sales": "http://n8n:5678/webhook/sales-chat",
    "hr": "http://n8n:5678/webhook/hr-chat",
    "sangsang": "http://n8n:5678/webhook/sangsang-chat",
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
def chat(req: ChatRequest, db: Session = Depends(get_db)):
    # 👉 여기에 n8n 또는 LLM 호출 로직 연결
    department = req.department.lower()

    if department not in N8N_WEBHOOKS:
        raise HTTPException(status_code=400, detail="Unknown department")

    try:
        res = requests.post(
            N8N_WEBHOOKS[department],
            json={
                "sessionId": req.session_id,
                "message": req.message
            },
            timeout=60
        )
        res.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=str(e))

    data = res.json()
    answer = data.get("reply", "응답이 없습니다.")

    save_chat(
        db=db,
        user_id=req.user_id,
        session_id=req.session_id,
        dept=req.department,
        question=req.message,
        answer=answer
    )

    return {"reply": answer}


@router.get("/recent")
def recent(user_id: str, department: str, limit: int = 5, db: Session = Depends(get_db)):
    rows = (
        db.query(ChatHistory.question, ChatHistory.department, ChatHistory.created_at)
        .filter(ChatHistory.user_id == user_id)
        .filter(ChatHistory.department == department)
        .order_by(ChatHistory.created_at.desc())
        .limit(limit)
        .all()
    )

    return [
        {"question": q, "department": d, "created_at": t}
        for q, d, t in rows
    ]