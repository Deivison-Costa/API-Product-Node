const jwt = require('jsonwebtoken');
require('dotenv').config();

// chave secreta para assinar o token
const jwtSecret = process.env.JWT_SECRET;

// mid para autenticar o token
exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decodedToken.userId;
    next();
  });
};