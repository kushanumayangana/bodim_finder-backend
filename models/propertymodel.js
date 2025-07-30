const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  postId: { type: String },
  description: { type: String },
  gender: { type: String },
  price: { type: Number, required: true },
  monthly: { type: Boolean, default: false },
  ownerName: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  image: { type: String },
  university: { type: String, required: true },
  city: { type: String },
  adress: { type: String },
  location: { type: String },
  bedroom: { type: Number, default: 0 },
  bathroom: { type: Number, default: 0 },
  kitchen: { type: Number, default: 0 },
  bed: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
