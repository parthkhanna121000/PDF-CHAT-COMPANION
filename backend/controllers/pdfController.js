const { extractTextFromPDF } = require('../services/pythonBridgeService.js');
const PDF = require('../models/PDF');

const uploadPDF = async (req, res) => {
  try {
    console.log("Uploaded file:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // ✅ Destructure extracted text from Python JSON result
    const { text } = await extractTextFromPDF(filePath);

    const savedPdf = await PDF.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      text,
      user: req.user.id
    });

    console.log("Saved PDF in MongoDB:", savedPdf);

    res.status(201).json(savedPdf);

  } catch (err) {
    console.error('PDF upload error:', err);
    res.status(500).json({ message: 'Error processing PDF' });
  }
};

module.exports = { uploadPDF };
