const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  // subscription_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  subscription_type: { type: String, enum: ['free', 'premium'], required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
