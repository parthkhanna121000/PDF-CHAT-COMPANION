import React, { useEffect, useState } from "react";

const MessageBubble = ({ sender, message }) => {
  const [visible, setVisible] = useState(false);
  const isUser = sender === "user";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const bubbleClasses = isUser
    ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-br-none"
    : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-900 dark:from-gray-700 dark:to-gray-800 dark:text-white rounded-bl-none";

  const profileCircle = (label, colors) => (
    <div
      className={`w-9 h-9 rounded-full ${colors} flex items-center justify-center text-white text-xs font-semibold shadow`}
    >
      {label}
    </div>
  );

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } px-4 mb-4 transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-end gap-2 max-w-full">
        {!isUser &&
          profileCircle("AI", "bg-gradient-to-r from-gray-500 to-gray-700")}

        <div
          className={`relative px-4 py-3 text-sm md:text-base rounded-2xl shadow-md max-w-[80%] sm:max-w-[70%] whitespace-pre-wrap break-words ${bubbleClasses}`}
        >
          {message}
          <div className="absolute -bottom-5 right-2 text-[10px] text-gray-400">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {isUser &&
          profileCircle("You", "bg-gradient-to-r from-blue-600 to-blue-800")}
      </div>
    </div>
  );
};

export default MessageBubble;
