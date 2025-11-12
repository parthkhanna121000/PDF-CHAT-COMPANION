# PDF Chat Companion

## Project Overview

PDF Chat Companion is a React.js-based web application that allows users to upload PDF files and interact with the content through a chat interface. Users can ask questions related to the PDF, receive AI-generated responses, and manage multiple PDFs—all through a clean, responsive UI.

> **Note:** Currently, only the frontend is fully implemented. Backend integration and AI functionalities are planned for future development.

---

## Features

- PDF Upload and Management
- Interactive Chat Window to ask questions
- Simulated AI responses for demo purposes
- Responsive design using Tailwind CSS

---

## Technologies Used

- React.js
- JavaScript (ES6+)
- Tailwind CSS
- Axios (for API calls preparation)

---

## Installation & Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pdf-chat-companion.git
   cd pdf-chat-companion
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`

---

## Project Structure

- `src/components/` — Reusable React components (Auth, PDFUpload, Chat, Dashboard)
- `src/api/` — Axios setup and API call placeholders
- `src/pages/` — Login, Signup, Home pages
- `src/App.js` — Main app component and routing

---

## Challenges & Solutions

- **Backend Integration Pending**: Simulated chat responses in the frontend to demonstrate intended functionality.
- **State Management**: Used React hooks (`useState`, `useEffect`) to handle user input, PDF uploads, and chat messages efficiently.
- **Responsive Design**: Applied Tailwind CSS for a clean and mobile-friendly UI.

---

## Future Work

- Complete backend integration with Node.js and Express.js
- Integrate AI-powered question answering and summarization
- Add features like quiz generation, PDF comparison, and audio responses
