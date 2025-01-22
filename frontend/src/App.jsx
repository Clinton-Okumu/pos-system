import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

const App = () => {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;
