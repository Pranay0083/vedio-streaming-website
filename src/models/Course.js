const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  topics: [String],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
