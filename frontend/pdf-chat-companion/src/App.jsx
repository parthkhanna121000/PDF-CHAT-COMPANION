import React, { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "./components/ChatBox";
import ThemeToggle from "./components/ThemeToggle";
import PdfUploader from "./components/PdfUploader";
1;
function App() {
  const [pdfText, setPdfText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col transition-all duration-500 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white tracking-wide">
            PDF Chat Companion
          </h1>
        </div>
        <ThemeToggle onClick={toggleTheme} />
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 flex flex-col gap-6 animate-fade-in">
        <section>
          <PdfUploader setPdfText={setPdfText} />
        </section>
        <section className="flex-1">
          <ChatBox
            pdfText={pdfText}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        </section>
      </main>

      {/* Toast */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
