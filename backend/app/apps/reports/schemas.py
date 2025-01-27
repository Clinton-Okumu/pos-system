from pydantic import BaseModel
from typing import List, Optional
from datetime import date


class SalesReportRequest(BaseModel):
    start_date: date
    end_date: date
    group_by: Optional[str] = "daily"


class SalesData(BaseModel):
    date: str
    total_sales: float
    total_quantity: int


class SalesReportResponse(BaseModel):
    total_revenue: float
    total_quantity_sold: int
    sales_data: List[SalesData]


class InventoryReportResponse(BaseModel):
    product_id: int
    product_name: str
    quantity: int
    stock_value: float
