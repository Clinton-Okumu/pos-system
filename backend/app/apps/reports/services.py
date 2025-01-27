from sqlalchemy.orm import Session
from sqlalchemy import func, extract, and_
from app.apps.transactions.models import Transaction
from app.apps.products.models import Product
from app.apps.reports.schemas import SalesReportRequest


def generate_sales_report(db: Session, report_request: SalesReportRequest):
    # Group by options: daily, weekly, monthly
    group_by_column = None
    if report_request.group_by == "daily":
        group_by_column = func.date(Transaction.created_at)
    elif report_request.group_by == "weekly":
        group_by_column = func.date_trunc("week", Transaction.created_at)
    elif report_request.group_by == "monthly":
        group_by_column = func.date_trunc("month", Transaction.created_at)
    else:
        raise ValueError(
            "Invalid group_by option. Use 'daily', 'weekly', or 'monthly'."
        )

    # Query sales data
    sales_data = (
        db.query(
            group_by_column.label("date"),
            func.sum(Transaction.total_price).label("total_sales"),
            func.sum(Transaction.quantity).label("total_quantity"),
        )
        .filter(
            and_(
                Transaction.created_at >= report_request.start_date,
                Transaction.created_at <= report_request.end_date,
            )
        )
        .group_by(group_by_column)
        .order_by(group_by_column)
        .all()
    )

    # Calculate total revenue and quantity
    total_revenue = sum(row.total_sales for row in sales_data)
    total_quantity_sold = sum(row.total_quantity for row in sales_data)

    return {
        "total_revenue": total_revenue,
        "total_quantity_sold": total_quantity_sold,
        "sales_data": [
            {
                "date": row.date,
                "total_sales": row.total_sales,
                "total_quantity": row.total_quantity,
            }
            for row in sales_data
        ],
    }


def generate_inventory_report(db: Session):
    # Query low stock and stock value
    inventory_data = (
        db.query(
            Product.id.label("product_id"),
            Product.name.label("product_name"),
            Product.quantity,
            (Product.price * Product.quantity).label("stock_value"),
        )
        .filter(Product.quantity > 0)  # Only include products in stock
        .all()
    )

    return inventory_data
