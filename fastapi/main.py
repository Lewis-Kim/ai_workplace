import os
import requests
from urllib.parse import quote_plus

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from pydantic import BaseModel

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

# =========================
# FastAPI App
# =========================
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # 개발용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Session
app.add_middleware(
    SessionMiddleware,
    secret_key="dev-session-secret"
)

# =========================
# Database
# =========================
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")

password = quote_plus(str(db_password))

DATABASE_URL = (
    f"mysql+pymysql://{db_user}:{password}"
    f"@{db_host}:{db_port}/{db_name}"
    "?charset=utf8mb4"
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=1800,
)


SessionLocal = sessionmaker(bind=engine)

# =========================
# Login
# =========================
class LoginBody(BaseModel):
    login_id: str
    password: str


@app.post("/login")
def login(request: Request, body: LoginBody):
    db = SessionLocal()
    try:
        user = db.execute(
            text("""
                SELECT user_id, login_id, name, department
                FROM project3.users
                WHERE login_id = :login_id
                  AND password = :password
            """),
            {
                "login_id": body.login_id,
                "password": body.password
            }
        ).fetchone()
    finally:
        db.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    request.session["user"] = {
        "user_id": user.user_id,
        "login_id": user.login_id,
        "name": user.name,
        "department": user.department
    }

    return {"result": "ok"}


@app.get("/me")
def me(request: Request):
    return request.session.get("user")

# =========================
# Chat (n8n)
# =========================
N8N_WEBHOOKS = {
    "marketing": "http://n8n:5678/webhook/marketing-chat",
    "sales": "http://n8n:5678/webhook/sales-chat",
    "hr": "http://n8n:5678/webhook/hr-chat",
}

class ChatRequest(BaseModel):
    sessionId: str
    department: str
    message: str


@app.post("/chat")
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

# =========================
# Health
# =========================
@app.get("/api")
def root():
    return {"message": "FastAPI is running"}

# =========================
# Qdrant
# =========================
@app.get("/create_vector_store")
def create_vector_store():
    client = QdrantClient(host="qdrant", port=6333)
    client.create_collection(
        collection_name="documents",
        vectors_config=VectorParams(size=768, distance=Distance.COSINE)
    )
    return {"message": "create success!"}


@app.post("/logout")
def logout(request: Request):
    request.session.clear()
    return {"result": "ok"}

