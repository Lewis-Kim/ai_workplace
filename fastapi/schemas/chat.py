# schemas/chat.py
from pydantic import BaseModel
from datetime import datetime

class ChatRequest(BaseModel):
    user_id: str
    session_id: str
    department: str
    message: str


class ChatResponse(BaseModel):
    answer: str


class RecentQuestion(BaseModel):
    question: str
    created_at: datetime
