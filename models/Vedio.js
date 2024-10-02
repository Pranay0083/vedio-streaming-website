const mongoose = require('mongoose');

const vedioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    filePath: { type: String, required: true },
  });

module.exports = mongoose.model('Vedio', vedioSchema);