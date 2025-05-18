const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('authMiddleware:', typeof authMiddleware);
console.log('chatController exports:', chatController);

router.post('/summarize', authMiddleware, chatController.summarizeTopic);
router.post('/ask', authMiddleware, chatController.askQuestion);

module.exports = router;
