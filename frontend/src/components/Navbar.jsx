import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";

const Navbar = ({ logoutUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-64 bg-white shadow-sm z-20 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          Dashboard Overview
        </h1>

        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative">
            <Bell className="h-5 w-5 text-gray-600 hover:text-gray-900" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full bg-gray-200 group-hover:ring-2 group-hover:ring-blue-500"></div>
            <span className="hidden md:block text-sm text-gray-700 group-hover:text-blue-500">
              Admin
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-500 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden md:block text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
