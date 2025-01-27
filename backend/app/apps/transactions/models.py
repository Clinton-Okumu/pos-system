from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(
        Integer, ForeignKey("products.id"), nullable=False
    )  # Foreign key to Product
    quantity = Column(Integer, nullable=False)  # Number of items sold
    total_price = Column(
        DECIMAL(10, 2), nullable=False
    )  # Total price of the transaction
    created_at = Column(TIMESTAMP, default=func.now())  # Timestamp of the transaction

    # Relationships
    product = relationship("Product", back_populates="transactions")
