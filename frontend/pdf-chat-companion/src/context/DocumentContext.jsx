// src/context/DocumentContext.js

import React, { createContext, useState, useContext } from "react";

// --- Mock Data (with IDs and URLs as planned) ---
const initialDocuments = [
  {
    id: "1",
    name: "Research_Paper_v3.pdf",
    size: "2.4 MB",
    date: "Oct 28, 2025",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    file: null, // Added for consistent object shape
  },
  {
    id: "2",
    name: "Marketing_Plan_Q4.pdf",
    size: "1.1 MB",
    date: "Oct 25, 2025",
    url: "https://www.africau.edu/images/default/sample.pdf",
    file: null, // Added for consistent object shape
  },
];

// --- Helper function to format file size ---
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// --- Create The Context ---
const DocumentContext = createContext();

// --- Create The Provider (the component that wraps your app) ---
export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState(initialDocuments);

  const addDocument = (file) => {
    // Create a new document object
    const newDocument = {
      id: Date.now().toString(), // Simple unique ID
      name: file.name,
      size: formatBytes(file.size),
      date: new Date().toLocaleDateString(),

      // --- THIS IS THE UPDATE ---
      // Store the raw File object for the viewer
      file: file,
      // Store a URL in case it's needed elsewhere
      url: URL.createObjectURL(file),
    };

    setDocuments((prevDocs) => [newDocument, ...prevDocs]);
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocument }}>
      {children}
    </DocumentContext.Provider>
  );
}

// --- Create a custom hook for easy access ---
export const useDocuments = () => {
  return useContext(DocumentContext);
};
