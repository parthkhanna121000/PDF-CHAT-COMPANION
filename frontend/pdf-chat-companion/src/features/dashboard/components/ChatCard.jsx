import React from "react";
import { ArrowUpIcon } from "../../../components/ui/Icons";

// Define the glassmorphism style for cards
const glassCardStyle =
  "bg-white/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-lg";

const ChatCard = () => {
  return (
    <div className={`${glassCardStyle} col-span-3 lg:col-span-2 p-6`}>
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        Chat with "Market_Analysis_2025.pdf"
      </h3>
      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
        <div className="flex justify-start">
          <div className="bg-white/50 p-3 rounded-lg rounded-bl-none max-w-xs">
            <p className="text-sm text-slate-700">
              Hello! Ask me anything about your document.
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-600/80 text-white p-3 rounded-lg rounded-br-none max-w-xs shadow-md">
            <p className="text-sm">What are the key market trends for 2025?</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white/50 p-3 rounded-lg rounded-bl-none max-w-xs">
            <p className="text-sm text-slate-700">
              The key trends include AI integration, a shift to sustainability,
              and... (loading)
            </p>
          </div>
        </div>
      </div>
      <div className="relative mt-4">
        <input
          type="text"
          placeholder="Ask a question..."
          className={`${glassCardStyle} w-full pl-4 pr-12 py-3 rounded-full text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50`}
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-600/80 transition-all duration-300">
          <ArrowUpIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatCard;
