// Load environment variables from the .env file
require('dotenv').config();

// Configuration object
const config = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
};

module.exports = config;
