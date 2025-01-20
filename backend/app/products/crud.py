from app.core.database import get_connection


def create_product(name: str, price: float, quantity: int):
    connection = get_connection()
    cursor = connection.cursor()

    # Insert product
    cursor.execute(
        """
        INSERT INTO products (name, price, quantity)
        VALUES (?, ?, ?)
    """,
        (name, price, quantity),
    )

    connection.commit()
    connection.close()


def get_all_products():
    connection = get_connection()
    cursor = connection.cursor()

    # Fetch all products
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()

    connection.close()
    return products
