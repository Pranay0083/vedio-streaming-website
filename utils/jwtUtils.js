const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, 'd059e58d4e1fcf961aa360f3d5ef2d495123d53a320a49fb41f0dbf6c3643aee', { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, 'd059e58d4e1fcf961aa360f3d5ef2d495123d53a320a49fb41f0dbf6c3643aee');
};

module.exports = {
  generateToken,
  verifyToken
};
