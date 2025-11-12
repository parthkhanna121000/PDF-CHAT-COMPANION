PDF Chat Companion

Project Overview

PDF Chat Companion is a modern, responsive web application built with React.js and Tailwind CSS. It enables users to upload local PDF documents and interact with them using a real-time, context-aware chat interface. This project is a demonstration of advanced front-end architecture, robust file handling, and readiness for AI integration.

Status Note: The core front-end, routing, state management, document handling, and foundational service architecture are fully implemented. Simulated chat responses are used for demonstration. Backend integration and AI functionalities are pending final connection.

Key Features Implemented

Robust Document Upload: Drag-and-drop file support using react-dropzone, client-side validation, and successful handling of local file objects (not just URLs).

Context-Aware Chat Interface: The chat window automatically detects which document is open in the viewer, providing contextual conversation history.

Modern PDF Viewer: Integrated react-pdf with page navigation, zoom controls, and a fixed architecture to reliably load both local (File object) and external (URL) PDFs.

Professional Authentication: Login component uses a decoupled authService layer with integrated loading, error handling, and token storage.

Dynamic UI Layout: Responsive 50/50 split layout for the Viewer and Chat, managed by centralized state.

Technologies Used

Core: React.js, JavaScript (ES6+), Tailwind CSS

State & Routing: React Hooks (useState, useEffect), React Context (for global document state), react-router-dom

PDF Handling: react-pdf, pdfjs-dist (for reliable local worker configuration)

Utilities: react-dropzone (for file upload), Axios (setup for future API consumption)

Installation & Running Locally

Clone the repository

git clone [https://github.com/yourusername/pdf-chat-companion.git](https://github.com/yourusername/pdf-chat-companion.git)
cd pdf-chat-companion

Install dependencies

npm install

Start the development server

npm run dev # Standard command for Vite projects

Open your browser and go to http://localhost:5173 (or the port shown in your terminal).

Project Structure

src/components/ — Reusable, low-level UI elements (e.g., ModernPdfViewer, buttons).

src/features/ — Feature-specific modules (chat/, dashboard/, auth/).

src/services/ — Dedicated architectural layer for API/Backend logic (e.g., authService.js).

src/context/ — Global state management via React Context (DocumentContext.js).

src/pages/ — Top-level views (DocumentView.jsx, MyDocuments.jsx).

Challenges & Industrial Solutions

This project overcame key hurdles using industry-standard solutions:

Challenge: Client-Side PDF Worker Reliability

Solution: Resolved persistent "Failed to load PDF" errors by correcting pdfjs-dist version compatibility with react-pdf and explicitly configuring the worker path for reliable loading in the Vite environment.

Challenge: Decoupling Authentication Logic

Solution: Implemented a dedicated authService.js layer to separate API calls, token storage, and business logic from the Login.jsx UI component, resulting in a cleaner, testable architecture.

Challenge: Contextual Application State

Solution: Designed a Document Context to centralize file state, allowing non-related components (like the sidebar, viewer, and chat) to communicate and synchronize the actively selected document ID without prop drilling.

Future Work

Complete backend integration with Node.js and Express.js.

Integrate a Gemini API connection for AI-powered question answering and summarization.

Implement real-time database persistence (e.g., Firestore) for document metadata and chat history.

Add features like PDF summarization and multi-user collaboration.
