from fastapi import FastAPI
from app.core.database import Base, engine
from app.apps.products.models import Product
from app.apps.products.routers import router as product_router

# Initialize the FastAPI app
app = FastAPI(
    title="POS System", description="A POS system for a cereal shop.", version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(product_router, prefix="/products", tags=["Products"])


@app.get("/")
def root():
    return {"message": "POS system is running!"}
