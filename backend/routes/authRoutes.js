// authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', (req, res) => {
  console.log('Register route hit');  // Log here to verify the route is being called
  register(req, res);
});

router.post('/login', (req, res) => {
  console.log('Login route hit');  // Log here to verify the route is being called
  login(req, res);
});

module.exports = router;
