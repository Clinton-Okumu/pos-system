from pydantic import BaseModel
from typing import List


class TransactionItemCreate(BaseModel):
    product_id: int
    quantity: int
    price: float


class TransactionCreate(BaseModel):
    items: List[TransactionItemCreate]
    total_amount: float


class TransactionResponse(BaseModel):
    id: int
    total_amount: float
    timestamp: str
