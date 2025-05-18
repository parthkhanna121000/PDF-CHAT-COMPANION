import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MessageBubble from "./MessageBubble";
import TypingLoader from "./TypingLoader";
import VoiceInput from "./VoiceInput";

const ChatBox = ({ pdfText, setPdfText, chatHistory, setChatHistory }) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [pdfSentInChat, setPdfSentInChat] = useState(false);
  const [uploadDots, setUploadDots] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  useEffect(() => {
    let interval;
    if (isUploading) {
      interval = setInterval(() => {
        setUploadDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
    } else {
      setUploadDots("");
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    if (
      uploadedFileName &&
      trimmedInput === `📄 ${uploadedFileName}` &&
      !pdfSentInChat
    ) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "user", message: `📄 Uploaded PDF: ${uploadedFileName}` },
      ]);
      setInput("");
      setPdfSentInChat(true);
      return;
    }

    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: trimmedInput },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/ask", {
        query: trimmedInput,
        context: pdfText,
      });

      if (!res.data.answer) {
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", message: "Sorry, I couldn't find an answer." },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", message: res.data.answer },
        ]);
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Failed to get response from AI.");
      setErrorMessage("⚠️ Failed to fetch AI response. Please try again.");
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: "Sorry, something went wrong!" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      toast.error("❌ Please upload a valid PDF file.");
      setInput("❌ PDF upload failed.");
      return;
    }

    setIsUploading(true);
    setInput("Uploading PDF... 📄");

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await axios.post(
        "http://localhost:5000/api/pdf/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { text, pdfName } = response.data;
      setPdfText(text);
      setUploadedFileName(pdfName);
      setPdfSentInChat(false);
      toast.success(`📄 "${pdfName}.pdf" uploaded successfully!`);
      setInput(`📄 ${pdfName}`);
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to upload PDF.");
      setInput("❌ PDF upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePdf = () => {
    setUploadedFileName(null);
    setPdfText("");
    setInput("");
    setPdfSentInChat(false);
    toast.info("📄 PDF removed. Upload again if needed!");
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6 rounded-3xl shadow-xl mt-6 border border-gray-200 dark:border-gray-700">
      <div className="h-[400px] overflow-y-auto mb-6 px-6 py-4 rounded-2xl bg-white/70 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 shadow-inner space-y-4 custom-scrollbar">
        {chatHistory.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            message={msg.message}
          />
        ))}
        {isTyping && <TypingLoader />}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder={
            isUploading
              ? `Uploading PDF${uploadDots} 📄`
              : "Type your question about the PDF..."
          }
          disabled={isUploading}
          className={`flex-1 w-full px-5 py-3 text-base rounded-full border transition-all focus:outline-none ${
            isUploading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white dark:bg-gray-900 dark:text-white"
          } border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="pdf-upload"
          />

          {!uploadedFileName ? (
            <label
              htmlFor="pdf-upload"
              className="cursor-pointer text-sm px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-all"
              title="Upload PDF"
            >
              📄 Upload PDF
            </label>
          ) : (
            <button
              onClick={handleRemovePdf}
              className="text-sm px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-all"
            >
              ❌ Remove PDF
            </button>
          )}

          <VoiceInput setInput={setInput} />

          <button
            onClick={sendMessage}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            
            ✉️ Send
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-600 text-center mt-4">{errorMessage}</div>
      )}
    </div>
  );
};

export default ChatBox;
