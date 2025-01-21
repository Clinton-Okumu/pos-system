from fastapi import APIRouter, HTTPException
from app.transactions.crud import create_transaction, get_all_transactions
from app.transactions.schemas import TransactionCreate, TransactionResponse

router = APIRouter()


@router.post("/", response_model=TransactionResponse)
def add_transaction(transaction: TransactionCreate):
    """
    Add a new transaction.
    """
    transaction_id = create_transaction(transaction.items, transaction.total_amount)
    return {
        "id": transaction_id,
        "total_amount": transaction.total_amount,
        "timestamp": "just now",
    }


@router.get("/", response_model=list[TransactionResponse])
def fetch_transactions():
    """
    Fetch all transactions.
    """
    transactions = get_all_transactions()
    if not transactions:
        raise HTTPException(status_code=404, detail="No transactions found")

    return [{"id": t[0], "total_amount": t[1], "timestamp": t[2]} for t in transactions]
