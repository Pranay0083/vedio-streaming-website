const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  url: { type: String, required: true },
  duration: Number,
  order: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);