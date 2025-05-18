const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadPDF } = require('../controllers/pdfController');
const { runPythonScript } = require('../services/pythonBridgeService');

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

// Only accept PDF files
const fileFilter = (req, file, cb) => {
  file.mimetype === 'application/pdf'
    ? cb(null, true)
    : cb(new Error('Only PDF files are allowed!'), false);
};

// Configure Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ✅ Route: Upload PDF
router.post('/upload', authMiddleware, upload.single('pdf'), uploadPDF);

// ✅ Route: Summarize Text
router.post('/summarize', authMiddleware, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const result = await runPythonScript('summarize.py', [text]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Route: Question Answering
router.post('/qa', authMiddleware, async (req, res) => {
  const { question, context } = req.body;
  if (!question || !context) return res.status(400).json({ error: 'Question and context are required' });

  try {
    const result = await runPythonScript('qa.py', [question, context]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Route: Compare Documents
router.post('/compare', authMiddleware, async (req, res) => {
  const { file1, file2 } = req.body;
  if (!file1 || !file2) return res.status(400).json({ error: 'Both file names are required' });

  try {
    const text1 = fs.readFileSync(path.join(__dirname, '../uploads', file1), 'utf-8');
    const text2 = fs.readFileSync(path.join(__dirname, '../uploads', file2), 'utf-8');

    const result = await runPythonScript('compare_docs.py', [text1, text2]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
