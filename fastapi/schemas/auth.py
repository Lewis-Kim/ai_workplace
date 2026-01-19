from pydantic import BaseModel

class LoginBody(BaseModel):
    login_id: str
    password: str
