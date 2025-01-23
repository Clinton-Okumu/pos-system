import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 bg-gray-800 text-white fixed h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow lg:ml-64">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
          <Navbar />
        </div>
        <div className="pt-16 p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
