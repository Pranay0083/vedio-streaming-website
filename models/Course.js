const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, default: 0 },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  });

module.exports = mongoose.model('Course', courseSchema);