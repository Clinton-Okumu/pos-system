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

    # Example table for products
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

    # Commit and close
    connection.commit()
    connection.close()
