import React from "react";

// Import a standard icon library (recommended)
import { Search } from "lucide-react";

// Import our new dashboard components with .jsx extensions
import AnalyticsCard from "./components/AnalyticsCard.jsx";
import UploadCard from "./components/UploadCard.jsx";
import ChatCard from "./components/ChatCard.jsx";
import QuickActions from "./components/QuickActions.jsx";

// Define the glassmorphism style for cards
const glassCardStyle =
  "bg-white/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-lg";

// The Dashboard component is now much cleaner
const Dashboard = () => {
  return (
    <main className="flex-1 h-full overflow-y-auto p-8">
      {/* Header (stays the same) */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Welcome back, Alex!
          </h2>
          <p className="text-slate-600">
            Here's an overview of your documents and activity.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documents..."
              className={`${glassCardStyle} pl-10 pr-4 py-2 rounded-full w-64 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50`}
            />
            {/* Use the Lucide icon */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          </div>
          <button
            className={`${glassCardStyle} p-2 rounded-full hover:bg-white/50 transition-all duration-300`}
          >
            <img
              src="https://placehold.co/40x40/667eea/e0e7ff?text=A"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white/50"
            />
          </button>
        </div>
      </header>

      {/* Dashboard Grid - NOW USING OUR NEW COMPONENTS */}
      <div className="grid grid-cols-3 gap-6">
        <UploadCard />
        <AnalyticsCard />
        <ChatCard />
        <QuickActions />
      </div>
    </main>
  );
};

export default Dashboard;
