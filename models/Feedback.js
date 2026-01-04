const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  feedback: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
