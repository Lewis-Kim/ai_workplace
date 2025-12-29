from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

N8N_CHAT_URL = "http://n8n:5678/webhook/95c101c8-5f3d-480f-8969-8173add1ff3d/chat"

class ChatRequest(BaseModel):
    message: str
    sessionId: str | None = None

@app.post("/chat")
def chat(req: ChatRequest):
    payload = {
        "message": req.message,
        "sessionId": req.sessionId
    }

    r = requests.post(
        N8N_CHAT_URL,
        json=payload,
        timeout=30
    )

    return {
        "reply": r.json().get("output", r.json())
    }

@app.get("/api")
def root():
    return {"message": "FastAPI is running"}


@app.post("/call-n8n")
def call_n8n(payload: dict):
    r = requests.post(
        "http://n8n:5678/webhook/test",
        json=payload
    )
    return r.json()
