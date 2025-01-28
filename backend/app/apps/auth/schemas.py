from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    role: str  # "admin" or "shopkeeper"


class UserCreate(UserBase):
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str
