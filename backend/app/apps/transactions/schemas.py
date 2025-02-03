from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from pydantic import Field
from datetime import timezone


class TransactionCreate(BaseModel):
    product_id: int
    quantity: int
    total_price: float
    payment_method: str  # e.g., "cash" or "m-pesa"
    status: str  # e.g., "completed" or "incomplete"
    created_at: Optional[datetime] = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class TransactionResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    total_price: float
    payment_method: str  # e.g., "cash" or "m-pesa"
    status: str  # e.g., "completed" or "incomplete"
    created_at: Optional[datetime] = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Config:
        from_attributes = True  # Enable ORM-to-Pydantic conversion


class TransactionUpdate(BaseModel):
    product_id: Optional[int] = None
    quantity: Optional[int] = None
    total_price: Optional[float] = None
    payment_method: Optional[str] = None  # e.g., "cash" or "m-pesa"
    status: Optional[str] = None  # e.g., "completed" or "incomplete"
