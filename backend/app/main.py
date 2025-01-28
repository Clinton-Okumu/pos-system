from fastapi import FastAPI
from app.core.database import Base, engine
from app.apps.auth.routers import router as auth_router
from app.apps.products.routers import router as products_router
from app.apps.transactions.routers import router as transactions_router
from app.apps.reports.routers import router as reports_router
from fastapi.middleware.cors import CORSMiddleware


# Initialize the FastAPI app
app = FastAPI(
    title="POS System",
    description="A POS system for a cereal shop with authentication functionality.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create database tables
Base.metadata.create_all(bind=engine)

# Include the auth router
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(products_router, prefix="/products", tags=["Products"])
app.include_router(transactions_router, prefix="/transactions", tags=["Transactions"])
app.include_router(reports_router, prefix="/reports", tags=["Reports"])


@app.get("/")
def root():
    return {"message": "POS system with authentication is running!"}
