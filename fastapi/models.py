from sqlalchemy import Column, BigInteger, String, Text, DateTime, Enum
from datetime import datetime
from database import Base

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(BigInteger, primary_key=True)
    session_id = Column(String(100))
    department = Column(String(50))
    role = Column(Enum("user", "bot"))
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class RecentQuestion(Base):
    __tablename__ = "recent_questions"

    id = Column(BigInteger, primary_key=True)
    session_id = Column(String(100))
    department = Column(String(50))
    question = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
