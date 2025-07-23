const Property = require('../models/property.model');

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
    univercity,
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
    univercity,
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
