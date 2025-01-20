from fastapi import APIRouter, HTTPException
from app.products.crud import create_product, get_all_products
from app.products.schemas import ProductCreate, ProductResponse

router = APIRouter()


@router.post("/products", response_model=ProductResponse)
def add_product(product: ProductCreate):
    """
    Add a new product to the database.
    """
    create_product(product.name, product.price, product.quantity)
    return {"message": "Product added successfully"}


@router.get("/products", response_model=list[ProductResponse])
def fetch_products():
    """
    Fetch all products from the database.
    """
    products = get_all_products()
    if not products:
        raise HTTPException(status_code=404, detail="No products found")

    return products
