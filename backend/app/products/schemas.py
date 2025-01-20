from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):
    name: str
    price: float
    quantity: int


class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    quantity: int
    created_at: str
