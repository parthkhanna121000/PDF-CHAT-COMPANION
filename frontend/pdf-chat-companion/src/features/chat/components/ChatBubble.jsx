import React from "react";

/**
 * Props:
 * - message: { sender: 'user' | 'bot', text: string }
 */
function ChatBubble({ message }) {
  const { sender, text } = message;

  // Determine alignment and styling based on the sender
  const isUser = sender === "user";

  const wrapperClasses = `flex mb-4 ${
    isUser ? "justify-end" : "justify-start"
  }`;
  const bubbleClasses = `max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-md ${
    isUser ? "bg-blue-600 text-white" : "bg-white text-gray-800"
  }`;

  return (
    <div className={wrapperClasses}>
      <div className={bubbleClasses}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

// --- THIS IS THE CRITICAL LINE ---
// Make sure this line exists at the end of your file.
export default ChatBubble;
