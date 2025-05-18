import axiosInstance from './axiosInstance';

// Function to ask a question related to the PDF content
export const askQuestion = async (question, pdfText) => {
  try {
    const response = await axiosInstance.post("/chat/ask", {
      message: question,
      pdfText: pdfText,
    });
    return response.data; // Contains the AI's response
  } catch (error) {
    console.error("Error asking question:", error);
    throw new Error("Failed to fetch answer from AI.");
  }
};

// Function to summarize the uploaded PDF text
export const summarizePdf = async (pdfText) => {
  try {
    const response = await axiosInstance.post("/chat/summarize", {
      pdfText: pdfText,
    });
    return response.data; // Contains the summarized content
  } catch (error) {
    console.error("Error summarizing PDF:", error);
    throw new Error("Failed to summarize the document.");
  }
};

// Function to generate a quiz based on the PDF content
export const generateQuiz = async (pdfText) => {
  try {
    const response = await axiosInstance.post("/chat/quiz", {
      pdfText: pdfText,
    });
    return response.data; // Contains the generated quiz questions and answers
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz.");
  }
};

// Function to compare two PDFs based on their content
export const comparePdfs = async (pdfText1, pdfText2) => {
  try {
    const response = await axiosInstance.post("/chat/compare", {
      pdfText1: pdfText1,
      pdfText2: pdfText2,
    });
    return response.data; // Contains the comparison result
  } catch (error) {
    console.error("Error comparing PDFs:", error);
    throw new Error("Failed to compare the documents.");
  }
};
