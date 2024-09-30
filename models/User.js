const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, maxlength: 100 },
  password_hash: { type: String, required: true, maxlength: 255 },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
