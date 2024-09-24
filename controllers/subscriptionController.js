const Subscription = require('../models/Subscription');

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new subscription
const createSubscription = async (req, res) => {
  const subscription = new Subscription(req.body);
  try {
    const newSubscription = await subscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a subscription by ID
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subscription by ID
const updateSubscriptionById = async (req, res) => {
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a subscription by ID
const deleteSubscriptionById = async (req, res) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!deletedSubscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json({ message: 'Subscription deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSubscriptions,
  createSubscription,
  getSubscriptionById,
  updateSubscriptionById,
  deleteSubscriptionById
};
