from fastapi import APIRouter

router = APIRouter()

@router.get("/api")
def health():
    return {"message": "FastAPI is running"}
