import React from "react";

// Define the glassmorphism style for cards
const glassCardStyle =
  "bg-white/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-lg";

// You could pass in stats as props, but for now, we'll keep it simple.
const AnalyticsCard = () => {
  return (
    <div className={`${glassCardStyle} p-6`}>
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        Your Analytics
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Documents Uploaded</span>
          <span className="font-bold text-2xl text-purple-600">27</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Questions Asked</span>
          <span className="font-bold text-2xl text-purple-600">124</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Summaries Generated</span>
          <span className="font-bold text-2xl text-purple-600">15</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
