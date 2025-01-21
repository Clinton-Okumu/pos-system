from app.core.database import get_connection


def create_transaction(items, total_amount):
    connection = get_connection()
    cursor = connection.cursor()

    # Insert the transaction
    cursor.execute(
        "INSERT INTO transactions (total_amount) VALUES (?)", (total_amount,)
    )
    transaction_id = cursor.lastrowid

    # Insert each item
    for item in items:
        cursor.execute(
            """
            INSERT INTO transaction_items (transaction_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
        """,
            (transaction_id, item["product_id"], item["quantity"], item["price"]),
        )

    connection.commit()
    connection.close()
    return transaction_id


def get_all_transactions():
    connection = get_connection()
    cursor = connection.cursor()

    # Fetch all transactions
    cursor.execute("SELECT * FROM transactions")
    transactions = cursor.fetchall()

    connection.close()
    return transactions
