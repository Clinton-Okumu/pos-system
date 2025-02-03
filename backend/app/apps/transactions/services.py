from sqlalchemy.orm import Session
from app.apps.transactions.models import Transaction
from app.apps.products.models import Product
from app.apps.transactions.schemas import TransactionCreate, TransactionUpdate
from fastapi import HTTPException


def create_transaction(db: Session, transaction_data: TransactionCreate):
    product = (
        db.query(Product).filter(Product.id == transaction_data.product_id).first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product.quantity < transaction_data.quantity:
        raise HTTPException(
            status_code=400, detail="Insufficient stock for the transaction"
        )

    total_price = product.price * transaction_data.quantity
    product.quantity -= transaction_data.quantity
    db.add(product)

    transaction = Transaction(
        product_id=transaction_data.product_id,
        quantity=transaction_data.quantity,
        total_price=total_price,
        payment_method=transaction_data.payment_method,
        status=transaction_data.status,
        created_at=transaction_data.created_at,
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction


def get_all_transactions(db: Session):
    return db.query(Transaction).all()


def get_transactions_by_product(db: Session, product_id: int):
    return db.query(Transaction).filter(Transaction.product_id == product_id).all()


def update_transaction(
    db: Session, transaction_id: int, transaction_data: TransactionUpdate
):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    for key, value in transaction_data.model_dump(exclude_unset=True).items():
        setattr(transaction, key, value)

    db.commit()
    db.refresh(transaction)
    return transaction


def delete_transaction(db: Session, transaction_id: int):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    db.delete(transaction)
    db.commit()
