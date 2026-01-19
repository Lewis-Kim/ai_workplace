from fastapi import APIRouter, HTTPException, Request
from sqlalchemy import text

from db import SessionLocal
from schemas.auth import LoginBody

router = APIRouter(tags=["Auth"])

@router.post("/login")
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


@router.get("/me")
def me(request: Request):
    return request.session.get("user")


@router.post("/logout")
def logout(request: Request):
    request.session.clear()
    return {"result": "ok"}
