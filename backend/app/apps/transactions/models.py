from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.core.database import Base
from sqlalchemy import Enum


class Transaction(Base):
    __tablename__ = "transactions"

    STATUS_CHOICES = Enum("completed", "incomplete", name="status_enum")
    PAYMENT_METHODS = Enum("cash", "m-pesa", name="payment_method_enum")

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=False)

    status = Column(STATUS_CHOICES, nullable=False)
    payment_method = Column(PAYMENT_METHODS, nullable=False)

    created_at = Column(TIMESTAMP, default=func.now(), nullable=False)

    product = relationship("Product", back_populates="transactions")
