import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Box, DollarSign, Users, BarChart2 } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-gray-100 flex flex-col transition-all">
      {/* Branding */}
      <div className="p-6 text-2xl font-extrabold text-white text-center">
        POS System
      </div>

      {/* Navigation */}
      <ul className="flex-grow">
        <li className="px-6 py-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-3 hover:bg-gray-800 hover:text-white cursor-pointer transition-all ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="px-6 py-3">
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex items-center space-x-3 hover:bg-gray-800 hover:text-white cursor-pointer transition-all ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <DollarSign size={20} />
            <span>Sales</span>
          </NavLink>
        </li>
        <li className="px-6 py-3">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center space-x-3 hover:bg-gray-800 hover:text-white cursor-pointer transition-all ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <Box size={20} />
            <span>Products</span>
          </NavLink>
        </li>
        <li className="px-6 py-3">
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center space-x-3 hover:bg-gray-800 hover:text-white cursor-pointer transition-all ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <BarChart2 size={20} />
            <span>Reports</span>
          </NavLink>
        </li>
      </ul>

      {/* Footer */}
      <div className="p-6 text-sm text-gray-400 text-center">
        © 2025 Cereal Shop POS
      </div>
    </div>
  );
};

export default Sidebar;
