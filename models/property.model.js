const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  postId: String,
  description: String,
  gender: String,
  price: Number,
  monthly: Boolean,
  ownerName: String,
  contactNumber: String,
  email: String,
  image: String,
  univercity: String,
  city: String,
  adress: String,
  location: String,
  bedroom: Number,
  bathroom: Number,
  kitchen: Number,
  bed: Number
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
