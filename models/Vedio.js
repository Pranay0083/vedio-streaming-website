const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  video_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, maxlength: 255 },
  description: { type: String, required: true },
  video_url: { type: String, required: true, maxlength: 255 },
  thumbnail_url: { type: String, required: true, maxlength: 255 },
  category_id: { type: Number, required: true },
  uploaded_by: { type: Number, required: true },
  upload_date: { type: Date, default: Date.now },
  view_count: { type: Number, default: 0 }
});

module.exports = mongoose.model('Video', videoSchema);
