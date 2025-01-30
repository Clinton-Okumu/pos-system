import React from "react";
import { DollarSign, Box, ShoppingCart, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const statsCards = [
    {
      title: "Total Sales",
      value: "ksh. 15,000",
      icon: DollarSign,
      color: "blue",
    },
    {
      title: "Total Transactions",
      value: "250",
      icon: ShoppingCart,
      color: "green",
    },
    {
      title: "Top Selling Product",
      value: "Cornflakes",
      icon: Box,
      color: "yellow",
    },
    {
      title: "Stock Availability",
      value: "5 Items Low",
      icon: TrendingUp,
      color: "red",
    },
  ];

  const recentActivity = [
    { text: "Sale completed - Order #1234", value: "+$1,200", color: "green" },
    { text: "New customer signed up", value: "+1", color: "blue" },
    { text: "Payment pending - Order #5678", value: "-$340", color: "red" },
  ];

  return (
    <div className="pt-16 p-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsCards.map(({ title, value, icon: Icon, color }) => (
          <div
            key={title}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-600">{title}</h2>
              <Icon className={`h-5 w-5 text-${color}-500`} />
            </div>
            <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Sales Trend */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Sales Trend
        </h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Graph Showing Sales Trend Over Time</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map(({ text, value, color }) => (
            <div
              key={text}
              className="flex items-center justify-between py-2 border-b border-gray-100"
            >
              <span className="text-gray-600">{text}</span>
              <span className={`text-${color}-600 font-medium`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
