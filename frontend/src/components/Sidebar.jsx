// src/components/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold">POS System</div>
      <ul className="flex-grow">
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
          Dashboard
        </li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Products</li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Sales</li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
          Customers
        </li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Reports</li>
      </ul>
      <div className="p-4 text-sm">© 2025 POS System</div>
    </div>
  );
};

export default Sidebar;
