import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart2, ShoppingCart, Box, TrendingUp } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: BarChart2, text: "Dashboard", path: "/dashboard" },
    { icon: ShoppingCart, text: "Sales", path: "/transactions" },
    { icon: Box, text: "Products", path: "/products" },
    { icon: TrendingUp, text: "Reports", path: "/reports" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-gray-100 flex flex-col z-30">
      <div className="p-6 text-2xl font-extrabold text-white text-center border-b border-gray-800">
        POS System
      </div>

      <ul className="flex-grow space-y-1 px-3 py-4">
        {navItems.map(({ icon: Icon, text, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{text}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="p-4 text-sm text-gray-400 text-center border-t border-gray-800">
        © 2025 Cereal Shop POS
      </div>
    </div>
  );
};

export default Sidebar;
