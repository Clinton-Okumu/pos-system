from fastapi import FastAPI
from app.core.database import initialize_database

# Initialize the FastAPI app
app = FastAPI()

# Call the database initializer
initialize_database()


@app.get("/")
def read_root():
    return {"message": "Welcome to the POS system!"}
