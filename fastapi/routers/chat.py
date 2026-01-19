import requests
from fastapi import APIRouter, HTTPException
from schemas.chat import ChatRequest

# router = APIRouter(prefix="/api", tags=["Chat"])
router = APIRouter(tags=["Chat"])

N8N_WEBHOOKS = {
    "marketing": "http://n8n:5678/webhook/marketing-chat",
    "sales": "http://n8n:5678/webhook/sales-chat",
    "hr": "http://n8n:5678/webhook/hr-chat",
}

@router.post("/chat")
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
