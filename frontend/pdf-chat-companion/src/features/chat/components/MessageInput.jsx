import React, { useState } from "react";
// --- UPDATED IMPORTS ---
// Removed curly braces for default exports and added .jsx extension
import Input from "../../../components/ui/Input.jsx";
import Button from "../../../components/ui/Button.jsx";
// -----------------------
import { Send } from "lucide-react"; // This is a package, so it's fine

/**
 * Props:
 * - onSendMessage: (messageText: string) => void
 * - isLoading: boolean
 */
function MessageInput({ onSendMessage, isLoading = false }) {
  const [messageText, setMessageText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim() && !isLoading) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 bg-gray-100 border-t border-gray-200"
    >
      <Input
        type="text"
        className="flex-grow mr-4"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : <Send className="w-5 h-5" />}
      </Button>
    </form>
  );
}

export default MessageInput;
