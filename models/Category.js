const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_id: { type: Number, required: true, unique: true },
  category_name: { type: String, required: true, maxlength: 100 }
});

module.exports = mongoose.model('Category', categorySchema);
