from fastapi import FastAPI
from pydantic import BaseModel
import requests
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

app = FastAPI()

N8N_CHAT_URL = "http://n8n:5678/webhook/chat"

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

@app.get("/create_vector_store")
def create():
    client = QdrantClient(host="qdrant", port=6333)

    client.create_collection(
        collection_name="documents",
        vectors_config=VectorParams(
            size=768,
            distance=Distance.COSINE
        )
    )
    return {"message": "create success!"}