const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
  // view_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  video_id: { type: Number, required: true },
  view_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('View', viewSchema);
