# POS System

## Backend (FastAPI)

### Project Overview

This is the backend for the POS system, built with **FastAPI**. It provides RESTful APIs for managing products, transactions, users, and reports. The backend is modular, with separate apps for core functionalities like authentication, products, transactions, and reports.

### Features

- **Product Management**
  - CRUD operations for products.
  - Image handling (stored locally in `static/images`).
- **Transaction Management**
  - Record sales and manage transactions.
  - Automatically update inventory stock.
- **User Authentication and Management**
  - Role-based access control (e.g., Admin, Shopkeeper).
  - JWT-based authentication.
- **Reporting**
  - Generate sales reports (daily, weekly, monthly).
  - Generate inventory reports for low stock and stock value.
- **Database**
  - PostgreSQL for scalability and reliability.

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd pos-backend

```
