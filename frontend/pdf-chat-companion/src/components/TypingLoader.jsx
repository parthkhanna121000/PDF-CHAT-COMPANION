import React from "react";

const TypingLoader = () => {
  return (
    <div className="flex items-center justify-start px-4 py-2">
      <div className="flex items-center bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 px-4 py-2 rounded-full shadow-md">
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingLoader;
