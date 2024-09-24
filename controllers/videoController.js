const Video = require('../models/Vedio');

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new video
const createVideo = async (req, res) => {
  const video = new Video(req.body);
  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a video by ID
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a video by ID
const updateVideoById = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVideo) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a video by ID
const deleteVideoById = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVideos,
  createVideo,
  getVideoById,
  updateVideoById,
  deleteVideoById
};
