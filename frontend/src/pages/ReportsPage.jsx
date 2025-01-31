import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, TrendingUp, Package, Users } from "lucide-react";

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState("monthly");

  // Example data
  const salesData = {
    totalSales: 15000,
    salesByCategory: [
      { category: "Cereal", sales: 5000, profit: 2000 },
      { category: "Snacks", sales: 3000, profit: 1200 },
      { category: "Beverages", sales: 7000, profit: 2800 },
    ],
    dailySales: [
      { date: "Mon", sales: 1200 },
      { date: "Tue", sales: 1800 },
      { date: "Wed", sales: 1400 },
      { date: "Thu", sales: 2000 },
      { date: "Fri", sales: 2400 },
      { date: "Sat", sales: 1800 },
      { date: "Sun", sales: 1600 },
    ],
  };

  const inventoryData = [
    { product: "Cornflakes", stock: 5, sales: 500, threshold: 10 },
    { product: "Rice Crispies", stock: 8, sales: 300, threshold: 15 },
    { product: "Cheerios", stock: 2, sales: 700, threshold: 12 },
  ];

  const customerData = {
    newCustomers: 120,
    repeatCustomers: 85,
    totalSpending: 20000,
    satisfaction: 4.5,
    customerTypes: [
      { name: "New", value: 120 },
      { name: "Repeat", value: 85 },
    ],
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  const StatsCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend && (
            <p
              className={`text-sm mt-2 ${trend >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {trend >= 0 ? "+" : ""}
              {trend}% from last period
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Reports Overview
          </h1>
          <div className="flex items-center gap-4">
            <select
              value={dateRange}
              onChange={handleDateRangeChange}
              className="p-2 rounded-lg border border-gray-300 bg-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Total Sales"
            value={`$${salesData.totalSales.toLocaleString()}`}
            icon={TrendingUp}
            trend={12.5}
          />
          <StatsCard
            title="Products Sold"
            value="1,234"
            icon={Package}
            trend={5.2}
          />
          <StatsCard
            title="New Customers"
            value={customerData.newCustomers}
            icon={Users}
            trend={-2.4}
          />
          <StatsCard
            title="Customer Satisfaction"
            value={`${customerData.satisfaction}/5.0`}
            icon={Users}
            trend={0.8}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData.dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#0088FE"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Sales by Category</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData.salesByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#0088FE" />
                  <Bar dataKey="profit" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Low Stock Alert</h2>
            <div className="space-y-4">
              {inventoryData.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-gray-500">
                      Sales: {item.sales} units
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        item.stock < item.threshold
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.stock} in stock
                    </p>
                    <p className="text-sm text-gray-500">
                      Threshold: {item.threshold}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Customer Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerData.customerTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {customerData.customerTypes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
