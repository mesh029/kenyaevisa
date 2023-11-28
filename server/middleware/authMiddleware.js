const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env


const authenticateJWT = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(403).json({ message: 'Access denied.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: ' token.' });
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
