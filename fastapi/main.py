from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Base
from db import engine
from starlette.middleware.sessions import SessionMiddleware


# from routers import auth, chat, health, qdrant
from routers.auth import router as auth_router
from routers.chat import router as chat_router
from routers.health import router as health_router
from routers.qdrant import router as qdrant_router
from routers.upload import router as upload_router


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Session
app.add_middleware(
    SessionMiddleware,
    secret_key="dev-session-secret"
)

# Routers
app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(health_router)
app.include_router(qdrant_router)
app.include_router(upload_router)

