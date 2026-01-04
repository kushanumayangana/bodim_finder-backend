const Property = require('../models/propertymodel');

// Create a new property
// imagePath may be a string (single filename) or an array of filenames
exports.createProperty = async (data, imagePath) => {
  const {
    title,
    postId,
    discription,
    gender,
    price,
    monthly,
    ownerName,
    contactNumber,
    email,
    university,
    city,
    adress,
    location,
    bedroom,
    bathroom,
    kitchen,
    bed
  } = data;

  const newProperty = new Property({
    title,
    postId,
    description: discription,
    gender,
    price,
    monthly,
    ownerName,
    contactNumber,
    email,
    // normalize to imageUrl array to match the model
    imageUrl: Array.isArray(imagePath) ? imagePath : (imagePath ? [imagePath] : []),
    university,
    city,
    adress,
    location,
    bedroom,
    bathroom,
    kitchen,
    bed
  });

  return await newProperty.save();
};

