// src/middleware/roleMiddleware.js

const roleBasedMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      const user = req.user;
      if (allowedRoles.includes(user.role)) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }
    };
  };
  
  module.exports = roleBasedMiddleware;