from sqlalchemy.orm import Session
from app.transactions.models import Transaction
from app.products.models import Product
from app.transactions.schemas import TransactionCreate


def create_transaction(db: Session, transaction_data: TransactionCreate):
    # Fetch the product from the database
    product = (
        db.query(Product).filter(Product.id == transaction_data.product_id).first()
    )
    if not product:
        raise ValueError("Product not found.")

    # Check if there’s enough stock
    if product.quantity < transaction_data.quantity:
        raise ValueError("Insufficient stock for the transaction.")

    # Calculate the total price
    total_price = product.price * transaction_data.quantity

    # Deduct the stock
    product.quantity -= transaction_data.quantity
    db.add(product)

    # Create a new transaction record
    transaction = Transaction(
        product_id=transaction_data.product_id,
        quantity=transaction_data.quantity,
        total_price=total_price,
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    return transaction


def get_all_transactions(db: Session):
    # Fetch all transactions
    return db.query(Transaction).all()


def get_transactions_by_product(db: Session, product_id: int):
    # Fetch transactions for a specific product
    return db.query(Transaction).filter(Transaction.product_id == product_id).all()
