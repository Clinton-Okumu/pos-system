from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.utils.dependencies import require_role
from app.apps.products.schemas import ProductCreate, ProductUpdate, ProductResponse
from app.apps.products.services import (
    create_product,
    get_all_products,
    get_product_by_id,
    update_product,
    delete_product,
)

router = APIRouter()


# Create a product (Admin or Shopkeeper)
@router.post(
    "/",
    response_model=ProductResponse,
    dependencies=[Depends(require_role("admin", "shopkeeper"))],
)
def add_product(product_data: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product_data)


# Get all products (Admin or Shopkeeper)
@router.get(
    "/",
    response_model=list[ProductResponse],
    dependencies=[Depends(require_role("admin", "shopkeeper"))],
)
def list_products(db: Session = Depends(get_db)):
    return get_all_products(db)


# Get a single product by ID (Admin or Shopkeeper)
@router.get(
    "/{product_id}",
    response_model=ProductResponse,
    dependencies=[Depends(require_role("admin", "shopkeeper"))],
)
def retrieve_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# Update a product (Admin or Shopkeeper)
@router.put(
    "/{product_id}",
    response_model=ProductResponse,
    dependencies=[Depends(require_role("admin", "shopkeeper"))],
)
def modify_product(
    product_id: int, product_data: ProductUpdate, db: Session = Depends(get_db)
):
    updated_product = update_product(db, product_id, product_data)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product


# Delete a product (Admin or Shopkeeper)
@router.delete(
    "/{product_id}", dependencies=[Depends(require_role("admin", "shopkeeper"))]
)
def remove_product(product_id: int, db: Session = Depends(get_db)):
    deleted_product = delete_product(db, product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": f"Product with ID {product_id} has been deleted."}
