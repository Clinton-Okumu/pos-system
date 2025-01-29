import React from "react";
import {
  DollarSign,
  Box,
  Users,
  BarChart2,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Total Sales Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-600">Total Sales</h2>
            <DollarSign size={30} className="text-blue-600" />
          </div>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">
            ksh. 15,000
          </p>
        </div>

        {/* Total Transactions Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Transactions
            </h2>
            <ShoppingCart size={30} className="text-green-600" />
          </div>
          <p className="text-4xl font-extrabold text-green-600 mt-2">250</p>
        </div>

        {/* Top Selling Products Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-600">
              Top Selling Product
            </h2>
            <Box size={30} className="text-yellow-500" />
          </div>
          <p className="text-4xl font-extrabold text-yellow-500 mt-2">
            Cornflakes
          </p>
        </div>

        {/* Stock Availability Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-600">
              Stock Availability
            </h2>
            <TrendingUp size={30} className="text-red-600" />
          </div>
          <p className="text-4xl font-extrabold text-red-600 mt-2">
            5 Items Low
          </p>
        </div>
      </div>

      {/* Sales Trend Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sales Trend</h2>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="h-64 bg-blue-100 flex justify-center items-center rounded-xl">
            <BarChart2 size={50} className="text-blue-500" />
            <p className="text-gray-600 text-xl font-semibold mt-4">
              Graph Showing Sales Trend Over Time
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="text-gray-600">
                Sale completed - Order #1234
              </span>
              <span className="text-green-600 font-semibold">+ $1,200</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">New customer signed up</span>
              <span className="text-blue-600 font-semibold">+ 1</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">
                Payment pending - Order #5678
              </span>
              <span className="text-red-600 font-semibold">- $340</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
