import React, { useState, useEffect } from "react";
import FileUploader from "../components/FileUploader";
import ChatBox from "../components/ChatBox";
import DarkModeToggle from "../components/DarkModeToggle";

const Home = () => {
  const [pdfText, setPdfText] = useState("");
  const [chatHistory, setChatHistory] = useState(() => {
    // Load chat history from localStorage
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          📄 PDF Chat Companion
        </h1>
        <DarkModeToggle />
      </div>

      <FileUploader setPdfText={setPdfText} />
      <ChatBox
        pdfText={pdfText}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
      />
    </div>
  );
};

export default Home;
