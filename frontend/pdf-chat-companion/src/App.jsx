// src/App.jsx

import React, { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./features/dashboard/Dashboard";
import Chat from "./features/chat/Chat";
import Analytics from "./features/analytics/Analytics";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import MyDocuments from "./components/pages/MyDocuments";
import { DocumentProvider } from "./context/DocumentContext";

// --- 1. IMPORT THE DOCUMENT VIEW PAGE ---
import DocumentView from "./pages/DocumentView";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState("login");
  const [activeTab, setActiveTab] = useState("Dashboard");

  // --- 2. ADD STATE TO TRACK THE SELECTED DOCUMENT ---
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);

  // --- 3. CREATE A WRAPPER FOR 'setActiveTab' ---
  // This ensures that when you click a new sidebar tab,
  // it clears any document you were viewing.
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedDocumentId(null); // Reset document view
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;

      // --- 4. UPDATE "MY DOCUMENTS" LOGIC ---
      case "My Documents":
        if (selectedDocumentId) {
          // If a document is selected, show the viewer
          return (
            <DocumentView
              docId={selectedDocumentId}
              onBack={() => setSelectedDocumentId(null)} // Pass a function to go back
            />
          );
        } else {
          // Otherwise, show the list
          return (
            <MyDocuments
              onDocumentClick={(id) => setSelectedDocumentId(id)} // Pass a function to set the ID
            />
          );
        }

      case "Chat":
        return <Chat />;
      case "Analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  // --- AUTH LOGIC (No changes needed) ---
  if (!isAuthenticated) {
    if (authPage === "login") {
      return (
        <Login
          onLoginSuccess={() => setIsAuthenticated(true)}
          onSwitchToSignup={() => setAuthPage("signup")}
        />
      );
    } else {
      return (
        <Signup
          onSignupSuccess={() => setIsAuthenticated(true)}
          onSwitchToLogin={() => setAuthPage("login")}
        />
      );
    }
  }

  // --- MAIN APP RENDER ---
  return (
    <DocumentProvider>
      <div className="font-sans bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 h-screen overflow-hidden">
        <div className="flex h-full">
          {/* 5. PASS THE NEW 'handleTabChange' FUNCTION */}
          <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
          <div className="flex-1 h-full overflow-y-auto">{renderContent()}</div>
        </div>
      </div>
    </DocumentProvider>
  );
}
