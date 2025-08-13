const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  postedAt: { type: Date, default: Date.now }
});

const propertySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  postId: {
    type: String
  },
  description: {
    type: String
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Any'],
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  monthly: {
    type: Boolean,
    default: false
  },
  ownerName: {
    type: String
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  university: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  adress: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  bedroom: {
    type: Number,
    default: 0
  },
  bathroom: {
    type: Number,
    default: 0
  },
  kitchen: {
    type: Number,
    default: 0
  },
  bed: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);
