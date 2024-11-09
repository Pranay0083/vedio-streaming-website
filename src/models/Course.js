const mongoose = require('mongoose');

// Lesson Schema
const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  videoUrl: { type: String, required: true },
  description: { type: String, required: true }
});

// Module Schema
const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  lessons: [LessonSchema]
});

// Course Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  duration: { type: String, required: true },
  students: { type: Number, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  learningObjectives: [{ type: String, required: true }],
  modules: [ModuleSchema],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);