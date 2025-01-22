from fastapi import APIRouter, Query
from app.core.database import get_connection

router = APIRouter()


@router.get("/cash-flow")
def cash_flow_report(start_date: str, end_date: str):
    """
    Generate a cash flow report for the specified date range.
    """
    connection = get_connection()
    cursor = connection.cursor()

    query = """
    SELECT SUM(total_amount) AS total_revenue
    FROM transactions
    WHERE timestamp BETWEEN ? AND ?
    """
    cursor.execute(query, (start_date, end_date))
    result = cursor.fetchone()
    connection.close()

    total_revenue = result[0] if result and result[0] else 0
    return {
        "start_date": start_date,
        "end_date": end_date,
        "total_revenue": total_revenue,
    }


@router.get("/top-products")
def top_products_report(limit: int = Query(10, ge=1)):
    """
    Get the top-selling products by total revenue.
    """
    connection = get_connection()
    cursor = connection.cursor()

    query = """
    SELECT p.name, SUM(ti.quantity) AS total_quantity, SUM(ti.quantity * ti.price) AS total_revenue
    FROM transaction_items ti
    JOIN products p ON ti.product_id = p.id
    GROUP BY p.name
    ORDER BY total_revenue DESC
    LIMIT ?
    """
    cursor.execute(query, (limit,))
    results = cursor.fetchall()
    connection.close()

    return [
        {"product_name": row[0], "total_quantity": row[1], "total_revenue": row[2]}
        for row in results
    ]
