const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Access Denied: No Token Provided!' });
  }
  jwt.verify(token, 'd059e58d4e1fcf961aa360f3d5ef2d495123d53a320a49fb41f0dbf6c3643aee', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
