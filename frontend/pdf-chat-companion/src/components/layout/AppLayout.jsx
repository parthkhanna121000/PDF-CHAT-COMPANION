// src/components/layout/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Header from "./Header"; // Make sure you have this component too

const AppLayout = () => {
  return (
    <div className="font-inter bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 h-screen overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar is now persistent */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* <Header /> */} {/* Your header component */}
          {/* Page Content renders here */}
          <main className="flex-1 overflow-y-auto">
            {/* The <Outlet /> renders Dashboard, Chat, etc. based on the URL */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
