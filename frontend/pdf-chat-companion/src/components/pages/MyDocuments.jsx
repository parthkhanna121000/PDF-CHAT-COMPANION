// src/components/pages/MyDocuments.jsx

import React, { useCallback } from "react";
// 1. REMOVED 'Link' from 'react-router-dom'
import { useDropzone } from "react-dropzone";
import { useDocuments } from "../../context/DocumentContext";
import { FileTextIcon, UploadCloudIcon, MoreVerticalIcon } from "../ui/Icons";

// --- DropzoneOverlay component (no change) ---
const DropzoneOverlay = () => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-600/75 backdrop-blur-sm">
    <UploadCloudIcon className="w-24 h-24 text-white" />
    <p className="mt-4 text-2xl font-semibold text-white">Drop PDF to upload</p>
  </div>
);

// 2. ACCEPT THE 'onDocumentClick' PROP
const MyDocuments = ({ onDocumentClick }) => {
  const { documents, addDocument } = useDocuments();

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        addDocument(file);
      });
    },
    [addDocument]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <div {...getRootProps()} className="p-8 relative min-h-screen">
      <input {...getInputProps()} />
      {isDragActive && <DropzoneOverlay />}

      {/* --- Header (no change) --- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">My Documents</h1>
        <button
          onClick={open}
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          <UploadCloudIcon className="w-5 h-5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* --- Document List (no change) --- */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 font-semibold text-slate-500 text-sm">
          {/* ...headers... */}
        </div>

        {/* --- List Body (MODIFIED) --- */}
        <ul className="divide-y divide-slate-100">
          {documents.map((doc) => (
            // 3. REMOVED <Link> and added onClick to the <li>
            <li
              key={doc.id}
              onClick={() => onDocumentClick(doc.id)} // 4. CALL THE PROP
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {/* Name */}
              <div className="col-span-5 flex items-center gap-3">
                <FileTextIcon className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-slate-700">{doc.name}</span>
              </div>
              {/* Date */}
              <div className="col-span-3 text-slate-600">{doc.date}</div>
              {/* Size */}
              <div className="col-span-2 text-slate-600">{doc.size}</div>
              {/* Actions Button */}
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 5. Stop click from bubbling up
                    e.preventDefault();
                    console.log("Actions for", doc.name);
                  }}
                  className="p-2 rounded-full hover:bg-slate-200"
                >
                  <MoreVerticalIcon className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyDocuments;
