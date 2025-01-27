from fastapi import FastAPI
from app.core.database import Base, engine
from app.apps.auth.routers import router as auth_router
from app.apps.products.routers import router as products_router

# Initialize the FastAPI app
app = FastAPI(
    title="POS System",
    description="A POS system for a cereal shop with authentication functionality.",
    version="1.0.0",
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include the auth router
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(products_router, prefix="/products", tags=["Products"])


@app.get("/")
def root():
    return {"message": "POS system with authentication is running!"}
