// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-4">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded bg-gray-100 hover:bg-gray-200">
          Notifications
        </button>
        <button className="p-2 rounded bg-gray-100 hover:bg-gray-200">
          Profile
        </button>
      </div>
    </div>
  );
};

export default Navbar;
