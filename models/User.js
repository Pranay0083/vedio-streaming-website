const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, maxlength: 100 },
    password_hash: { type: String, required: true, maxlength: 255 },
    role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  });

module.exports = mongoose.model('User', userSchema);