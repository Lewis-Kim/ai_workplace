from pydantic import BaseModel

class ChatRequest(BaseModel):
    sessionId: str
    department: str
    message: str
