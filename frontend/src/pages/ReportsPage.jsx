import React, { useState } from "react";

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState("monthly");

  // Example data (would typically come from an API or database)
  const salesData = {
    totalSales: 15000,
    salesByCategory: [
      { category: "Cereal", sales: 5000 },
      { category: "Snacks", sales: 3000 },
      { category: "Beverages", sales: 7000 },
    ],
  };

  const inventoryData = [
    { product: "Cornflakes", stock: 5, sales: 500 },
    { product: "Rice Crispies", stock: 8, sales: 300 },
    { product: "Cheerios", stock: 2, sales: 700 },
  ];

  const customerData = {
    newCustomers: 120,
    repeatCustomers: 85,
    totalSpending: 20000,
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Reports Overview
      </h1>

      {/* Filters */}
      <div className="mb-6">
        <label className="text-gray-600">Select Date Range</label>
        <select
          value={dateRange}
          onChange={handleDateRangeChange}
          className="ml-2 p-2 rounded-lg border border-gray-300"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Sales Report Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Sales Report</h2>
        <div className="mt-4">
          <p>Total Sales: ${salesData.totalSales}</p>
          <p className="mt-2 font-semibold text-gray-600">Sales By Category:</p>
          <ul className="mt-2">
            {salesData.salesByCategory.map((category, index) => (
              <li key={index} className="flex justify-between">
                <span>{category.category}</span>
                <span>${category.sales}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Inventory Report Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Inventory Report
        </h2>
        <div className="mt-4">
          <p className="font-semibold text-gray-600">Low Stock Products:</p>
          <ul className="mt-2">
            {inventoryData.map((product, index) => (
              <li key={index} className="flex justify-between">
                <span>{product.product}</span>
                <span>{product.stock} in stock</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Customer Report Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Customer Report</h2>
        <div className="mt-4">
          <p>New Customers: {customerData.newCustomers}</p>
          <p>Repeat Customers: {customerData.repeatCustomers}</p>
          <p>Total Spending: ${customerData.totalSpending}</p>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
          Export Report
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
