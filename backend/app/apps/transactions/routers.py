from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.apps.transactions.schemas import TransactionCreate, TransactionResponse
from app.apps.transactions.services import (
    create_transaction,
    get_all_transactions,
    get_transactions_by_product,
)
from app.utils.dependencies import require_role

router = APIRouter()


# Create a transaction (Shopkeeper and Admin can create)
@router.post(
    "/",
    response_model=TransactionResponse,
    dependencies=[
        Depends(require_role("shopkeeper", "admin"))
    ],  # Allow both shopkeeper and admin
)
def add_transaction(transaction_data: TransactionCreate, db: Session = Depends(get_db)):
    try:
        transaction = create_transaction(db, transaction_data)
        return transaction
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Get all transactions (Admin only)
@router.get(
    "/",
    response_model=list[TransactionResponse],
    dependencies=[Depends(require_role("admin"))],  # Admin only
)
def list_transactions(db: Session = Depends(get_db)):
    return get_all_transactions(db)


# Get transactions by product (Admin only)
@router.get(
    "/by-product/{product_id}",
    response_model=list[TransactionResponse],
    dependencies=[Depends(require_role("admin"))],  # Admin only
)
def transactions_by_product(product_id: int, db: Session = Depends(get_db)):
    return get_transactions_by_product(db, product_id)
