// src/features/chat/Chat.jsx

import React, { useRef, useEffect } from "react";
import MessageInput from "./components/MessageInput";
import ChatBubble from "./components/ChatBubble";
import { useChat } from "../../hooks/useChat"; // Your existing hook

// --- 1. ACCEPT THE 'document' PROP ---
// We make 'document' optional. It will be present when in DocumentView,
// and 'undefined' when in the main 'Chat' tab.
function Chat({ document }) {
  // --- 2. PASS THE DOCUMENT ID (or null) TO THE HOOK ---
  // The hook can now know which document context to use.
  const documentId = document ? document.id : null;
  const { messages, isLoading, error, sendMessage } = useChat(documentId);

  const messagesEndRef = useRef(null); // Ref to auto-scroll

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // Added bg-white, but you can style as needed
    <div className="flex flex-col h-full bg-white">
      {/* --- 3. ADDED HEADER --- */}
      {/* This header changes based on whether you're in a document or not */}
      <div className="flex-shrink-0 p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 truncate">
          {document ? `Chat about "${document.name}"` : "General Chat"}
        </h3>
      </div>

      {/* Message List */}
      <div className="flex-grow p-6 overflow-y-auto">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {/* Display an error message if one exists */}
        {error && (
          <div className="text-red-500 text-sm text-center p-2">{error}</div>
        )}

        {/* Empty div to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0">
        <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Chat;
