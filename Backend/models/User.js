const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  borrowedItems: [{
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    borrowedDate: { type: Date, default: Date.now },
    returnDate: { type: Date }
  }]
});

module.exports = mongoose.model('User', userSchema);