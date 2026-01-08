from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

app = FastAPI()

# =========================
# n8n Webhook 매핑
# =========================
N8N_WEBHOOKS = {
    "marketing": "http://n8n:5678/webhook/marketing-chat",
    "sales": "http://n8n:5678/webhook/sales-chat",
    "hr": "http://n8n:5678/webhook/hr-chat"
}
# =========================
# Request / Response Schema
# =========================
class ChatRequest(BaseModel):
    sessionId: str
    department: str
    message: str


class ChatResponse(BaseModel):
    answer: str


# =========================
# Chat Endpoint
# =========================
@app.post("/chat")
def chat(req: ChatRequest):
    department = req.department.lower()

    # 1️⃣ 부서 검증
    if department not in N8N_WEBHOOKS:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown department: {department}"
        )

    webhook_url = N8N_WEBHOOKS[department]

    # 2️⃣ n8n으로 전달할 payload
    payload = {
        "sessionId": req.sessionId,
        "message": req.message
    }

    try:
        # 3️⃣ n8n 호출
        res = requests.post(
            webhook_url,
            json=payload,
            timeout=60
        )
        res.raise_for_status()

    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"n8n webhook error: {str(e)}"
        )

    # 4️⃣ n8n 응답 파싱
    data = res.json()

    reply = (
        data.get("reply")
        or data.get("answer")
        or data.get("text")
        or data.get("response")
        or "응답이 없습니다."
    )

    return {
        "reply": data.get("reply", "응답이 없습니다.")
    }


# @app.post("/chat")
# def chat(payload: dict):
#     # n8n 호출
#     r = requests.post(
#         "http://n8n:5678/webhook/chat",
#         json=payload,
#         timeout=30
#     )
#     r.raise_for_status()
#     data = r.json()

#     return {
#         "reply": data.get("reply", "응답이 없습니다.")
#     }


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