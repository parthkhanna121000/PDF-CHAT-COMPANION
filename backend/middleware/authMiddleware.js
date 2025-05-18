const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.get('Authorization')?.replace('Bearer ', '');

  // If there's no token, send an 'Access Denied' response
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = verified;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid or expired, send an error message
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
