const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // 'standard', 'premium', etc.
    enum: ['standard', 'premium']
  },
  cost: { type: Number, required: true },
  benefits: { type: String, required: true }  // Additional benefits like number of items a user can borrow
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);