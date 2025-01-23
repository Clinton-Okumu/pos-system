import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Branding */}
      <div className="p-6 text-2xl font-extrabold text-white">POS System</div>

      {/* Navigation */}
      <ul className="flex-grow">
        <li className="px-6 py-3 hover:bg-gray-800 hover:text-white cursor-pointer transition flex items-center space-x-3">
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </li>
        <li className="px-6 py-3 hover:bg-gray-800 hover:text-white cursor-pointer transition flex items-center space-x-3">
          <i className="fas fa-box"></i>
          <span>Products</span>
        </li>
        <li className="px-6 py-3 hover:bg-gray-800 hover:text-white cursor-pointer transition flex items-center space-x-3">
          <i className="fas fa-dollar-sign"></i>
          <span>Sales</span>
        </li>
        <li className="px-6 py-3 hover:bg-gray-800 hover:text-white cursor-pointer transition flex items-center space-x-3">
          <i className="fas fa-users"></i>
          <span>Customers</span>
        </li>
        <li className="px-6 py-3 hover:bg-gray-800 hover:text-white cursor-pointer transition flex items-center space-x-3">
          <i className="fas fa-chart-line"></i>
          <span>Reports</span>
        </li>
      </ul>

      {/* Footer */}
      <div className="p-6 text-sm text-gray-400">© 2025 POS System</div>
    </div>
  );
};

export default Sidebar;
