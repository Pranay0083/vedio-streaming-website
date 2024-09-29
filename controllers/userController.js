const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await comparePassword(req.body.password_hash, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// Create a new user
const createUser = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const user = new User({ ...req.body, password_hash: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
};
