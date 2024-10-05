const jwt = require('jsonwebtoken');

module.exports = {
    jwtExpirationInterval: '1d',
    generateToken: (userId) => {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: module.exports.jwtExpirationInterval,
        });
    },
    authorize: (...roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'You do not have permission to perform this action' });
            }
            next();
        };
    },
};