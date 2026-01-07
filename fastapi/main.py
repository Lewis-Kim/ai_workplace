from fastapi import FastAPI
from pydantic import BaseModel
import requests
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

app = FastAPI()

@app.post("/chat")
def chat(payload: dict):
    # n8n 호출
    r = requests.post(
        "http://n8n:5678/webhook/chat",
        json=payload,
        timeout=30
    )
    r.raise_for_status()
    data = r.json()

    return {
        "reply": data.get("reply", "응답이 없습니다.")
    }


@app.get("/api")
def root():
    return {"message": "FastAPI is running"}


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