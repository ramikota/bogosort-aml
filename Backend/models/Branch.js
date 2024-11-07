const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  mediaItems: [{
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    availableCopies: { type: Number, required: true }
  }]
}, { timestamps: true });

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;