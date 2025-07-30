const Property = require('../models/propertymodel');

// Create a property
exports.createProperty = async (req, res) => {
  try {
    const {
      title,
      postId,
      description,
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
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const newProperty = new Property({
      title,
      postId,
      description,
      gender,
      price: price ? Number(price) : 0,
      monthly: monthly === 'true' || monthly === true,
      ownerName,
      contactNumber,
      email,
      image,
      university,
      city,
      adress,
      location,
      bedroom: bedroom ? Number(bedroom) : 0,
      bathroom: bathroom ? Number(bathroom) : 0,
      kitchen: kitchen ? Number(kitchen) : 0,
      bed: bed ? Number(bed) : 0
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching all properties:', error);
    res.status(500).json({ error: 'Failed to fetch all properties' });
  }
};

// Get properties by university
exports.getPropertiesByUniversity = async (req, res) => {
  try {
    const universityName = req.params.university;

    const properties = await Property.find({
      university: { $regex: new RegExp('^' + universityName + '$', 'i') } // case-insensitive match
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties by university:', error);
    res.status(500).json({ error: 'Failed to fetch properties by university' });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

