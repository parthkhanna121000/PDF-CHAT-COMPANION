// src/pages/DocumentView.jsx

import React from "react";
import { useDocuments } from "../context/DocumentContext";
import Chat from "../features/chat/Chat";
import ModernPdfViewer from "../components/ModernPdfViewer";

// --- Simple Back Icon ---
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

function DocumentView({ docId, onBack }) {
  const { documents } = useDocuments();

  // 3. Find the document using 'docId' from props
  const document = documents.find((doc) => doc.id === docId);

  if (!document) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-red-600">
          Document not found!
        </h1>
        {/* 4. Use the onBack prop to go back */}
        <button
          onClick={onBack}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeftIcon />
          Back to My Documents
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100">
      {/* --- UPDATED: PDF Viewer Side (50% width) --- */}
      {/* Fixed typo w-2/H-full -> w-1/2 h-full */}
      <div className="w-1/2 h-full flex flex-col">
        {/* 5. ADD A HEADER WITH THE BACK BUTTON */}
        <div className="flex-shrink-0 p-4 bg-white border-b border-slate-200 shadow-sm z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeftIcon />
            <span>Back to My Documents</span>
          </button>
          <h2 className="mt-2 text-lg font-semibold text-slate-800 truncate">
            {document.name}
          </h2>
        </div>

        {/* 6. The viewer now fills the remaining space */}
        <div className="flex-grow h-0">
          <ModernPdfViewer document={document} />
        </div>
      </div>

      {/* --- UPDATED: Chat Side (50% width) --- */}
      <div className="w-1/2 h-full border-l border-slate-300">
        <Chat document={document} />
      </div>
    </div>
  );
}

export default DocumentView;
