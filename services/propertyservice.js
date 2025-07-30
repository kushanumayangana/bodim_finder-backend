const Property = require('../models/propertymodel');

// Create a new property
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
    image: imagePath,
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

