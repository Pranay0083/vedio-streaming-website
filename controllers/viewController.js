const View = require('../models/Views');

// Get all views
const getAllViews = async (req, res) => {
  try {
    const views = await View.find();
    res.status(200).json(views);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a new view
const createView = async (req, res) => {
    const view = new View(req.body);
    try {
      const newView = await view.save();
      res.status(201).json(newView);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get a view by ID
  const getViewById = async (req, res) => {
    try {
      const view = await View.findById(req.params.id);
      if (!view) return res.status(404).json({ message: 'View not found' });
      res.status(200).json(view);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a view by ID
  const updateViewById = async (req, res) => {
    try {
      const updatedView = await View.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedView) return res.status(404).json({ message: 'View not found' });
      res.status(200).json(updatedView);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a view by ID
  const deleteViewById = async (req, res) => {
    try {
      const deletedView = await View.findByIdAndDelete(req.params.id);
      if (!deletedView) return res.status(404).json({ message: 'View not found' });
      res.status(200).json({ message: 'View deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getAllViews,
    createView,
    getViewById,
    updateViewById,
    deleteViewById
  };
  