// models/pdfModel.js
const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: String,
  originalName: String,
  textContent: String,
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const PDF = mongoose.model('PDF', pdfSchema);
module.exports = PDF;
