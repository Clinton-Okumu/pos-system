import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow lg:ml-64">
        {/* Navbar */}
        <Navbar />
        <div className="pt-16 p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
