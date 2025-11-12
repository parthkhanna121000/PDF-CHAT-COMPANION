import { useState } from "react";

// --- Mock initial messages based on context ---
// This message shows for the "Chat about document"
const initialDocMessage = {
  id: "1",
  text: "Hello! Ask me anything about this document.",
  sender: "ai",
};

// This message shows for the "General Chat"
const initialGeneralMessage = {
  id: "1",
  text: "Hello! How can I help you today?",
  sender: "ai",
};

export const useChat = (documentId) => {
  // --- THIS IS THE KEY ---
  // We use a ternary operator to safely check if documentId exists.
  // If it's null, we use the general message.
  const [messages, setMessages] = useState([
    documentId ? initialDocMessage : initialGeneralMessage,
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = (text) => {
    // Add the user's message immediately
    const userMessage = { id: Date.now().toString(), text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setError(null);

    // --- MOCK AI RESPONSE ---
    // In a real app, you would send 'text' AND 'documentId' to your AI backend
    console.log(
      `Sending to AI: "${text}" (Context: ${documentId || "General"})`
    );

    setTimeout(() => {
      let aiText = "";

      // We check 'documentId' again to craft the correct response
      if (documentId) {
        aiText = `You asked about the document (ID: ${documentId}), and you said: "${text}". This is a mock response.`;
      } else {
        aiText = `You asked a general question: "${text}". This is a mock response.`;
      }

      const aiMessage = {
        id: Date.now().toString() + 1,
        text: aiText,
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500); // Simulate network delay
  };

  return { messages, isLoading, error, sendMessage };
};
