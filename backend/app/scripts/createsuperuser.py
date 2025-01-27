import sys
import os

# Add the project root directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from app.core.database import SessionLocal
from app.apps.auth.models import User
from app.utils.utils import hash_password


def create_superuser():
    db = SessionLocal()
    try:
        username = input("Enter superadmin username: ").strip()
        if not username:
            print("Username cannot be empty!")
            return

        password = input("Enter superadmin password: ").strip()
        if not password:
            print("Password cannot be empty!")
            return

        existing_user = db.query(User).filter(User.username == username).first()
        if existing_user:
            print(f"User with username '{username}' already exists.")
            return

        admin_user = User(
            username=username, password=hash_password(password), role="admin"
        )
        db.add(admin_user)
        db.commit()
        print(f"Superadmin user '{username}' created successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    create_superuser()
