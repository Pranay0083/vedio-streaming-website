const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const User = require('../models/User');
const jwt = require('../utils/jwtUtils')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await hashPassword(password);
        const user = new User({
            email,
            password_hash: hashedPassword,
            role
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
      const token = jwt.generateToken(user)
      res.status(200).json({ message: 'Login successful', userId: user._id, token: token });
      console.log("sucessfull login")
    } catch (error) {
      console.log("failed login")
      res.status(500).json({ message: 'Login error', error: error.message });
    }
  };

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Logout error', error: error.message });
    }
};


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

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
    loginUser,
    logoutUser,
    getUserById,
    updateUserById,
    deleteUserById
};
