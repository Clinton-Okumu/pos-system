import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold text-gray-600">Total Sales</h2>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">$15,000</p>
        </div>

        {/* New Customers Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold text-gray-600">New Customers</h2>
          <p className="text-4xl font-extrabold text-green-600 mt-2">120</p>
        </div>

        {/* Orders in Progress */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Orders in Progress
          </h2>
          <p className="text-4xl font-extrabold text-yellow-500 mt-2">45</p>
        </div>

        {/* Pending Payments */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Pending Payments
          </h2>
          <p className="text-4xl font-extrabold text-red-600 mt-2">$3,400</p>
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
