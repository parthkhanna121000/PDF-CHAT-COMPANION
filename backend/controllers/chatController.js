const mongoose = require('mongoose');
const PDF = require('../models/PDF'); // Adjust path if needed
const runPythonScript = require('../services/pythonRunner'); // Ensure this path is correct

// Summarize a topic using Python NLP
exports.summarizeTopic = async (req, res) => {
  const { pdfId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(pdfId)) {
      return res.status(400).json({ message: "Invalid PDF ID format." });
    }

    const pdf = await PDF.findById(pdfId);
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });

    // Call the Python script for summarization
    const summary = await runPythonScript('nlp/summarize.py', [pdf.filePath]);

    res.json({ summary: summary.trim() });
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ message: 'Summarization failed', error: error.message });
  }
};

// Ask a question using Python NLP
exports.askQuestion = async (req, res) => {
  const { pdfId, question } = req.body;
  const userId = req.user.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(pdfId)) {
      return res.status(400).json({ message: "Invalid PDF ID format." });
    }

    const pdf = await PDF.findById(pdfId);
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });

    // Call the Python script for question answering
    const answer = await runPythonScript('nlp/qa.py', [pdf.filePath, question]);

    res.json({ answer: answer.trim() });
  } catch (error) {
    console.error('Question answering error:', error);
    res.status(500).json({ message: 'Question answering failed', error: error.message });
  }
};

// You can similarly update other functions like generateQuiz and compareDocuments to use Python
