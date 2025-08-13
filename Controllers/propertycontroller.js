const Property = require('../models/propertymodel');

exports.createProperty = async (req, res) => {
  try {
    const {
      title,
      postId,
      description,
      gender,
      rent,
      monthly,
      ownerName,
      contact,
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

    const imageUrl = req.file ? req.file.filename : null;
    console.log('Uploaded file:', req.file);
    console.log('Image URL saved:', imageUrl);

    // Get user info from auth middleware
    const userId = req.user?.id;
    const username = req.user?.username;

    console.log(userId, username);
    if (!userId || !username) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    const newProperty = new Property({
      title,
      postId,
      description,
      gender,
      rent: rent ? Number(rent) : 0,
      monthly: monthly === 'true' || monthly === true,
      ownerName,
      contact,
      email,
      imageUrl,
      university,
      city,
      adress,
      location,
      bedroom: bedroom ? Number(bedroom) : 0,
      bathroom: bathroom ? Number(bathroom) : 0,
      kitchen: kitchen ? Number(kitchen) : 0,
      bed: bed ? Number(bed) : 0,
      userId,
      username
    });

    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching all properties:', error);
    res.status(500).json({ error: 'Failed to fetch all properties' });
  }
};

exports.getPropertiesByUniversity = async (req, res) => {
  try {
    const universityName = req.params.university;
    const properties = await Property.find({
      university: { $regex: new RegExp('^' + universityName + '$', 'i') }
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

exports.getPropertiesByUser = async (req, res) => {
  
  try {
    const userId = req.params.userId || req.user?.id;
    
    // Check if the userId is a valid ObjectId (24 character hex string)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(userId);
    
    let properties;
    if (isValidObjectId) {
      // Search by userId (ObjectId)
      properties = await Property.find({ userId: userId });
    } else {
      // Search by username (String)
      properties = await Property.find({ username: userId });
    }
    
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({ message: 'Failed to fetch user properties', error });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user?.id; // JWT token contains 'id', not '_id'

    console.log('Delete request - Property ID:', propertyId);
    console.log('Delete request - User ID:', userId);
    console.log('Delete request - User object:', req.user);

    // Validate ObjectId format
    if (!propertyId || !/^[0-9a-fA-F]{24}$/.test(propertyId)) {
      console.log('Invalid property ID format:', propertyId);
      return res.status(400).json({ message: 'Invalid property ID format' });
    }

    // Check if user is authenticated
    if (!userId) {
      console.log('No user ID found in request');
      return res.status(401).json({ message: 'User authentication required' });
    }

    // Find the property
    const property = await Property.findById(propertyId);
    
    if (!property) {
      console.log('Property not found:', propertyId);
      return res.status(404).json({ message: 'Property not found' });
    }

    console.log('Property found - Owner ID:', property.userId.toString());
    console.log('Requesting user ID:', userId.toString());

    // Check if user owns the property
    if (property.userId.toString() !== userId.toString()) {
      console.log('Authorization failed - User does not own this property');
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    // Delete the property
    await Property.findByIdAndDelete(propertyId);
    console.log('Property deleted successfully:', propertyId);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Failed to delete property', error: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user?.id;
    
    console.log('Update request - Property ID:', propertyId);
    console.log('Update request - User ID:', userId);
    console.log('Update request - Body:', req.body);

    // Validate ObjectId format
    if (!propertyId || !/^[0-9a-fA-F]{24}$/.test(propertyId)) {
      console.log('Invalid property ID format:', propertyId);
      return res.status(400).json({ message: 'Invalid property ID format' });
    }

    // Check if user is authenticated
    if (!userId) {
      console.log('No user ID found in request');
      return res.status(401).json({ message: 'User authentication required' });
    }

    // Find the property
    const property = await Property.findById(propertyId);
    
    if (!property) {
      console.log('Property not found:', propertyId);
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user owns the property
    if (property.userId.toString() !== userId.toString()) {
      console.log('Authorization failed - User does not own this property');
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    // Prepare update data
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      gender: req.body.gender,
      rent: req.body.rent ? Number(req.body.rent) : property.rent,
      monthly: req.body.monthly === 'true' || req.body.monthly === true,
      ownerName: req.body.ownerName,
      contact: req.body.contact,
      email: req.body.email,
      university: req.body.university,
      city: req.body.city,
      adress: req.body.adress,
      location: req.body.location,
      bedroom: req.body.bedroom ? Number(req.body.bedroom) : property.bedroom,
      bathroom: req.body.bathroom ? Number(req.body.bathroom) : property.bathroom,
      kitchen: req.body.kitchen ? Number(req.body.kitchen) : property.kitchen,
      bed: req.body.bed ? Number(req.body.bed) : property.bed,
    };

    // Handle image upload if new image is provided
    if (req.file) {
      updateData.imageUrl = req.file.filename;
      console.log('New image uploaded:', req.file.filename);
    }

    // Update the property
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updateData,
      { new: true, runValidators: true }
    );

    console.log('Property updated successfully:', propertyId);
    res.status(200).json({
      message: 'Property updated successfully',
      property: updatedProperty
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ 
      message: 'Failed to update property', 
      error: error.message 
    });
  }
};
