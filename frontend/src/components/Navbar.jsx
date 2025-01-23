import React from "react";

const Navbar = () => {
  return (
    <div className="h-16 bg-white shadow-md flex items-center justify-between px-6">
      {/* Branding */}
      <div className="text-2xl font-extrabold text-gray-800">POS Dashboard</div>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative group">
          <span className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <i className="fas fa-bell"></i>
          </span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile */}
        <button className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-full bg-gray-300 group-hover:ring-2 group-hover:ring-blue-500"></div>
          <span className="hidden md:block text-gray-700 font-medium group-hover:text-blue-500">
            Profile
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
