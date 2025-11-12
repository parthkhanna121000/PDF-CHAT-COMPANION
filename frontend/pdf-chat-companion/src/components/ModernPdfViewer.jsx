// src/components/ModernPdfViewer.jsx

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// --- Import CSS for react-pdf ---
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// --- PDF.js Worker Setup (THE NEWEST FIX) ---
// Remove ALL other worker import lines
// Just add this one line.
// This tells it to load the file from /pdf.worker.min.mjs
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
// ------------------------------------

// --- (Rest of the component is unchanged) ---
// ...

// --- Simple Loading Spinner Component ---
const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// --- Icon Components (No change) ---
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const ZoomInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
    />
  </svg>
);

const ZoomOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
    />
  </svg>
);
// --- End Icons ---

// --- The Main PDF Viewer Component ---
function ModernPdfViewer({ document }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1.0);

  // Resets when you open a new document
  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
    setIsLoading(true);
    setZoom(1.0);
  }, [document.id]);

  // --- Handlers ---
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
  }

  function onDocumentLoadError(error) {
    console.error("Error loading PDF:", error);
    setIsLoading(false);
  }

  const goToPrevPage = () => {
    setPageNumber((prevPage) => Math.max(1, prevPage - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(numPages, prevPage + 1));
  };

  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(2.0, prevZoom + 0.1));
  };

  const zoomOut = () => {
    setZoom((prevZoom) => Math.max(0.5, prevZoom - 0.1));
  };

  // --- Render ---
  return (
    <div className="flex flex-col h-full bg-slate-200 relative">
      {/* PDF Viewing Area */}
      <div className="flex-grow overflow-auto p-4 flex justify-center">
        <Document
          // Use the 'file' object (for uploads) or fall back to the 'url' (for mocks)
          file={document.file || document.url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<Spinner />}
          error={
            <div className="text-red-500 font-semibold p-4">
              Failed to load PDF. Please try again.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={zoom}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-xl"
          />
        </Document>
      </div>

      {/* --- Floating Toolbar --- */}
      {!isLoading && numPages && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-lg border border-slate-200">
            {/* Zoom Controls */}
            <button
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomOutIcon />
            </button>
            <span className="text-sm font-medium w-12 text-center select-none">
              {(zoom * 100).toFixed(0)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={zoom >= 2.0}
              className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomInIcon />
            </button>
            {/* Separator */}
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            {/* Page Navigation */}
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon />
            </button>
            <span className="text-sm font-medium text-slate-700 select-none">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon />
            </button>{" "}
            {/* <-- THIS WAS THE TYPO */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ModernPdfViewer;
