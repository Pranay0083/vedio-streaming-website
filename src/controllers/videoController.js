// File: src/controllers/videoController.js
const Video = require('../models/Video');
const Course = require('../models/Course');

exports.getCourseVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ course: req.params.courseId }).sort('order');
    res.json(videos);
  } catch (error) {
    next(error);
  }
};

exports.getVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne({ _id: req.params.videoId, course: req.params.courseId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    next(error);
  }
};

exports.createVideo = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only add videos to your own courses' });
    }
    const video = await Video.create({ ...req.body, course: course.id });
    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
};

exports.updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne({ _id: req.params.videoId, course: req.params.courseId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    const course = await Course.findById(req.params.courseId);
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only update videos in your own courses' });
    }
    Object.assign(video, req.body);
    await video.save();
    res.json(video);
  } catch (error) {
    next(error);
  }
};

exports.deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne({ _id: req.params.videoId, course: req.params.courseId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    const course = await Course.findById(req.params.courseId);
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only delete videos in your own courses' });
    }
    await video.remove();
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    next(error);
  }
};
