const User = require('../models/User');
const Course = require('../models/Course');

exports.getAllInstructors = async (req, res, next) => {
  try {
    const instructors = await User.find({ role: 'teacher' }).select('-password');
    res.json(instructors);
  } catch (error) {
    next(error);
  }
};

exports.getInstructor = async (req, res, next) => {
  try {
    const instructor = await User.findOne({ _id: req.params.id, role: 'teacher' }).select('-password');
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    const courses = await Course.find({ instructor: instructor._id }).select('title description');
    res.json({ instructor, courses });
  } catch (error) {
    next(error);
  }
};
