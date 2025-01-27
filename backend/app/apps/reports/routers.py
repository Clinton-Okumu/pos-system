from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.apps.reports.services import generate_sales_report, generate_inventory_report
from app.apps.reports.schemas import (
    SalesReportRequest,
    SalesReportResponse,
    InventoryReportResponse,
)
from app.utils.dependencies import require_role

router = APIRouter()


# Sales report
@router.post(
    "/sales",
    response_model=SalesReportResponse,
    dependencies=[Depends(require_role("admin"))],
)
def get_sales_report(report_request: SalesReportRequest, db: Session = Depends(get_db)):
    try:
        report = generate_sales_report(db, report_request)
        return report
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Inventory report
@router.get(
    "/inventory",
    response_model=list[InventoryReportResponse],
    dependencies=[Depends(require_role("admin"))],
)
def get_inventory_report(db: Session = Depends(get_db)):
    return generate_inventory_report(db)
