from pydantic import BaseModel, Field
from typing import Optional, Literal


class ProductCreate(BaseModel):
    name: str = Field(..., max_length=255)
    description: Optional[str]
    price: float = Field(..., gt=0)  # Price must be greater than 0
    quantity: int = Field(..., ge=0)  # Quantity must be non-negative
    image_url: Optional[str]
    payment_method: Literal["cash", "m-pesa"]  # Restrict to these choices
    status: Literal["complete", "incomplete"]


class ProductUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    quantity: Optional[int]
    image_url: Optional[str]
    payment_method: Literal["cash", "m-pesa"]  # Restrict to these choices
    status: Literal["complete", "incomplete"]


class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    quantity: int
    image_url: Optional[str]

    class Config:
        from_attributes = True
