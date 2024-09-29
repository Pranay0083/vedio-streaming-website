const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    // Return here so that further code is not executed after sending the response
    return res.status(403).json({ message: 'Access Denied: No Token Provided!' });
  }

  jwt.verify(token, 'd059e58d4e1fcf961aa360f3d5ef2d495123d53a320a49fb41f0dbf6c3643aee', (err, decoded) => {
    if (err) {
      // Return here as well to avoid multiple responses
      return res.status(401).json({ message: 'Invalid Token' });
    }

    // Set the user object and move to the next middleware or route
    req.user = decoded;
    next(); // Ensure that no other responses are sent after this
  });
};

module.exports = authMiddleware;
