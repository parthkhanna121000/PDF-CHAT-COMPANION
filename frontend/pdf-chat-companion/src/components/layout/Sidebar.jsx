// src/components/layout/Sidebar.jsx

import React from "react";
// --- MAKE SURE YOU ARE NOT IMPORTING NavLink ---

import {
  LayoutDashboardIcon,
  FileTextIcon,
  MessageSquareIcon,
  BarChart2Icon,
  SettingsIcon,
  LogoIcon,
} from "../ui/Icons";

const sidebarGlassStyle =
  "bg-white/20 backdrop-blur-3xl border-r border-white/20";

// --- STEP 1: Make sure it accepts the props ---
const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboardIcon },
    { name: "My Documents", icon: FileTextIcon },
    { name: "Chat", icon: MessageSquareIcon },
    { name: "Analytics", icon: BarChart2Icon },
  ];

  return (
    <nav
      className={`${sidebarGlassStyle} w-64 p-6 flex flex-col flex-shrink-0 h-full`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <LogoIcon className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          PDF Chat Companion
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-3">
        {navItems.map((item) => (
          <li key={item.name}>
            {/* --- STEP 2: Make sure this is an <a> tag, NOT a <NavLink> --- */}
            <a
              href="#"
              // --- STEP 3: This onClick is CRITICAL ---
              onClick={(e) => {
                e.preventDefault(); // Prevent page reload
                setActiveTab(item.name); // This tells App.jsx to change the page
              }}
              // --- STEP 4: This className checks the activeTab prop ---
              className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-all duration-300
                ${
                  activeTab === item.name
                    ? "bg-white/50 text-blue-600 shadow-md" // Active state
                    : "text-slate-600 hover:bg-white/30 hover:text-slate-900" // Inactive state
                }`}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Settings link at the bottom (you can wire this up later) */}
      <div className="mt-auto">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-white/30 hover:text-slate-900 transition-all duration-300"
        >
          <SettingsIcon className="w-6 h-6" />
          <span>Settings</span>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
