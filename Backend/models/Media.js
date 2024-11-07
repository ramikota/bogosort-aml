const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorOrCreator: { type: String, required: true },
  type: { type: String, required: true, enum: ['book', 'journal', 'periodical', 'cd', 'dvd', 'game'] },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  mediaId: { type: String, unique: true, required: true },
  branches: [{
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    availableCopies: { type: Number, required: true }
  }]
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;