const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  // comment_id: { type: Number, required: true, unique: true },
  video_id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  comment_text: { type: String, required: true },
  comment_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
