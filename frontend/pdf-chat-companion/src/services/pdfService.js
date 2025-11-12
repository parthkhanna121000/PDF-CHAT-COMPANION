import { api } from "./api";

/**
 * Sends a question about a specific document to the backend.
 * @param {string} documentId - The ID of the document being chatted with.
 * @param {string} question - The user's question.
 * @returns {Promise<object>} - The AI's response.
 */
const askQuestion = async (documentId, question) => {
  try {
    // This endpoint URL is an example. Adjust to your API's design.
    const response = await api.post(`/documents/${documentId}/chat`, {
      question: question,
    });

    // Assuming the API returns { data: { answer: "...", ... } }
    return response.data;
  } catch (error) {
    console.error("Error in pdfService.askQuestion:", error);
    // Re-throw a more specific error message
    throw new Error("Failed to get a response from the AI.");
  }
};

export const pdfService = {
  askQuestion,
};
