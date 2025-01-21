import sqlite3

# path to database
DATABASE = "app/database.db"


def get_connection():
    """
    Establishes a connection to the database
    """
    connection = sqlite3.connect(DATABASE, check_same_thread=False)
    return connection


def initialize_database():
    """
    Creates necessary tables in the database if they don't exist.
    """
    connection = get_connection()
    cursor = connection.cursor()

    # Table for products
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    # Table for transactions
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total_amount REAL NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    # Table for transaction items
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS transaction_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            transaction_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (transaction_id) REFERENCES transactions (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        )
        """
    )

    # Commit and close
    connection.commit()
    connection.close()
