from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TransactionCreate(BaseModel):
    product_id: int
    quantity: int  # Quantity of the product being sold


class TransactionResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    total_price: float
    created_at: datetime  # Timestamp of the transaction

    class Config:
        from_attributes = True  # Enable ORM-to-Pydantic conversion


class TransactionUpdate(BaseModel):
    product_id: Optional[int] = None
    quantity: Optional[int] = None
    total_price: Optional[float] = None
