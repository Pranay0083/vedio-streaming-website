const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, 'your_secret_key');
};

module.exports = {
  generateToken,
  verifyToken
};
