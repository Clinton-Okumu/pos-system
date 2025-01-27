from pydantic import BaseModel
from datetime import datetime


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
