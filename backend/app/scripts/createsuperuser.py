import os
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.apps.auth.models import User
from app.utils.utils import hash_password


def create_superuser():
    db: Session = SessionLocal()
    username = input("Enter username: ")
    password = input("Enter password: ")

    existing_user = db.query(User).filter(User.username == username).first()
    if existing_user:
        print("Admin already exists")
        return

    admin_user = User(username=username, password=hash_password(password), role="admin")
    db.add(admin_user)
    db.commit()
    print(f"Admin user {username} created successfully")


if __name__ == "__main__":
    create_superuser()
