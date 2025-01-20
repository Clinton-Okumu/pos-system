from fastapi import FastAPI
from app.core.database import initialize_database
from app.products.routes import router as products_router

# Initialize the FastAPI app
app = FastAPI()

# Call the database initializer
initialize_database()
app.include_router(products_router, prefix="/products")


@app.get("/")
def read_root():
    return {"message": "Welcome to  POS system!"}
