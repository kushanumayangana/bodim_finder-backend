const propertyService = require('../services/property.service');

exports.createProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    const imagePath = req.file ? req.file.path : null;

    const savedProperty = await propertyService.createProperty(propertyData, imagePath);
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Failed to create property' });
  }
};
