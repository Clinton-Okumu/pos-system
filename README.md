### **POS System ReadMe Files**

#### **Backend (FastAPI)**

##### **Project Overview**

This is the backend for the POS system. It is built using FastAPI and provides RESTful APIs for managing products, transactions, and users. The backend is designed to be modular, with separate apps for core functionality.

##### **Features**

- Product Management (CRUD operations for products)
- Transaction Management (Record sales and manage transactions)
- User Authentication and Management (Optional)
- Image Handling (Product images stored locally)
- SQLite for local data storage

##### **Setup Instructions**

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd pos-backend
   ```

2. **Set Up a Virtual Environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**:

   ```bash
   uvicorn app.main:app --reload
   ```

5. **Access API Documentation**:
   Open your browser and navigate to `http://127.0.0.1:8000/docs` for the interactive Swagger UI.

##### **Folder Structure**

```plaintext
app/
├── core/         # Configuration and database setup
├── products/     # Product management app
├── transactions/ # Transaction management app
├── users/        # User management app
├── static/       # Static files (e.g., product images)
├── main.py       # Main FastAPI application
├── database.db   # SQLite database
```

---

#### **Frontend (React)**

##### **Project Overview**

The frontend is built with React and serves as the user interface for the POS system. It communicates with the FastAPI backend via RESTful APIs to perform operations like product management, checkout, and reporting.

##### **Features**

- Dashboard for sales and inventory overview
- Product Management (Add, edit, delete products)
- Sales Checkout System
- Reporting Tools (Sales and Inventory)
- Responsive Design for desktops and tablets

##### **Setup Instructions**

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd pos-frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Application**:

   ```bash
   npm start
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000/`.

##### **Folder Structure**

```plaintext
src/
├── components/  # Reusable React components
├── pages/       # Page components (e.g., Dashboard, Checkout)
├── services/    # API service functions
├── App.js       # Main React app entry
```

---

#### **Database (SQLite)**

##### **Overview**

SQLite is used as the database for the POS system. It is lightweight, requires no server setup, and is ideal for local offline use.

##### **Features**

- Stores product information (name, price, quantity, image path)
- Records transactions and their associated items
- Provides easy data access for reporting

##### **Schema Overview**

1. **Products Table**:

   ```sql
   CREATE TABLE products (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       price REAL NOT NULL,
       quantity INTEGER NOT NULL,
       image_path TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **Transactions Table**:

   ```sql
   CREATE TABLE transactions (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       total_amount REAL NOT NULL,
       timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Transaction Items Table**:
   ```sql
   CREATE TABLE transaction_items (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       transaction_id INTEGER NOT NULL,
       product_id INTEGER NOT NULL,
       quantity INTEGER NOT NULL,
       price REAL NOT NULL,
       FOREIGN KEY (transaction_id) REFERENCES transactions (id),
       FOREIGN KEY (product_id) REFERENCES products (id)
   );
   ```

##### **Setup Instructions**

1. The database is automatically created when the FastAPI backend runs for the first time.
2. To inspect the database:
   ```bash
   sqlite3 database.db
   ```
3. Use `.tables` to list tables and SQL commands to query data.

---
