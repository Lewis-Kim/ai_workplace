# crud.py
from models import ChatHistory

def save_chat(db, user_id, session_id, dept, question, answer):
    chat = ChatHistory(
        user_id=user_id,
        session_id=session_id,
        department=dept,
        question=question,
        answer=answer
    )
    db.add(chat)
    db.commit()


def get_recent_questions(db, user_id, limit=10):
    return (
        db.query(ChatHistory.question, ChatHistory.department, ChatHistory.created_at)
        .filter(ChatHistory.user_id == user_id)
        .order_by(ChatHistory.created_at.desc())
        .limit(limit)
        .all()
    )
