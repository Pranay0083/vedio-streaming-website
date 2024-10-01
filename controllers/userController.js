const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password_hash');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({userId: user.user_id }, "d059e58d4e1fcf961aa360f3d5ef2d495123d53a320a49fb41f0dbf6c3643aee", { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', userId: user._id, token: token });
    console.log("sucessfull login")
  } catch (error) {
    console.log("failed login")
    res.status(500).json({ message: 'Login error', error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { email, password, role, ...otherDetails } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await hashPassword(password);
    const user = new User({
      email,
      password_hash: hashedPassword,
      role,
      ...otherDetails
    });
    await user.save().catch((saveError) => {
      console.error('Error saving user:', saveError);
      throw saveError;
    });
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Logout error', error: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password_hash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      updateData.password_hash = await hashPassword(password);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password_hash');
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  loginUser,
  createUser,
  logoutUser,
  getUserById,
  updateUserById,
  deleteUserById
};