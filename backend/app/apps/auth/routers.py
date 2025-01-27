from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from app.core.database import get_db
from app.apps.auth.models import User
from app.apps.auth.schemas import UserCreate, UserResponse
from app.utils.utils import hash_password, verify_password
from app.utils.jwt import create_access_token, decode_access_token
from app.utils.dependencies import require_role
import logging

# confugure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# In-memory blacklist (use Redis for production)
token_blacklist = set()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

router = APIRouter()


# Admin-only: Add a shopkeeper
@router.post(
    "/add-shopkeeper",
    response_model=UserResponse,
    dependencies=[Depends(require_role("admin"))],
)
def add_shopkeeper(user: UserCreate, db: Session = Depends(get_db)):
    # Check if username already exists
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")

    # Create shopkeeper
    shopkeeper = User(
        username=user.username, password=hash_password(user.password), role="shopkeeper"
    )
    db.add(shopkeeper)
    db.commit()
    db.refresh(shopkeeper)
    return shopkeeper


# Login for all users (admin and shopkeeper)
@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    # Query the database for the user
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Verify the password
    hashed_password = str(user.password)  # Ensure it’s treated as a string
    if not verify_password(password, hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate JWT access token
    access_token = create_access_token({"sub": user.username, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}


# Logout for all users (invalidate token)
@router.post("/logout")
def logout(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Add token to the blacklist
    token_blacklist.add(token)
    return {"message": "Logged out successfully"}


# Protected route example
@router.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    # Check if the token is blacklisted
    if token in token_blacklist:
        raise HTTPException(status_code=401, detail="Token has been invalidated")

    return {"message": "Access granted"}


@router.post("/refresh")
def refresh_token(refresh_token: str):
    payload = decode_access_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    access_token = create_access_token({"sub": payload["sub"], "role": payload["role"]})
    return {"access_token": access_token, "token_type": "bearer"}


@router.delete("/delete-superuser/{username}")
def delete_superuser(
    username: str,
    current_user: User = Depends(require_role("superadmin")),
    db: Session = Depends(get_db),
):
    # Prevent self-deletion
    if current_user.username == username:
        raise HTTPException(
            status_code=400, detail="You cannot delete your own account."
        )

    # Fetch the superuser to delete by username
    superuser = (
        db.query(User).filter(User.username == username, User.role == "admin").first()
    )
    if not superuser:
        raise HTTPException(status_code=404, detail="Superuser not found.")

    # Soft delete: Mark as inactive (optional)
    superuser.is_active = False  # Assuming `is_active` column is added for soft delete
    db.commit()

    return {"message": f"Superuser with username '{username}' has been deactivated."}
