const Comment = require('../models/Comment');
const Property = require('../models/propertymodel'); // Your property model
const User = require('../models/Registarmodel'); // Your user model

exports.createComment = async (req, res) => {
  const propertyId = req.params.id; // property ID from URL
  const userId = req.user?.id; // JWT token contains 'id', not '_id'
  const { text } = req.body;

  console.log('Comment request - User object:', req.user);
  console.log('Comment request - User ID:', userId);

  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: user info missing' });
  }

  try {
    console.log('Creating comment for property:', propertyId);
    console.log('User ID from token:', userId);
    
    // Optionally verify that property exists
    const propertyExists = await Property.findById(propertyId);
    if (!propertyExists) {
      console.log('Property not found:', propertyId);
      return res.status(404).json({ message: 'Property not found' });
    }

    // Get user info to store username
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found:', userId);
      return res.status(401).json({ message: 'User not found' });
    }

    // Create new comment with username
    const newComment = new Comment({
      property: propertyId,
      user: userId,
      username: user.username, // Store username directly
      text,
      createdAt: new Date()
    });

    const savedComment = await newComment.save();
    console.log('Comment created successfully:', savedComment._id);

    return res.status(201).json(savedComment);

  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getComments = async (req, res) => {
  const { id: propertyId } = req.params;
  const currentUserId = req.user?.id; // Get current user ID if authenticated

  try {
    // Get comments for the property
    const comments = await Comment.find({ property: propertyId })
      .sort({ createdAt: -1 });

    // Format comments with username display logic
    const formattedComments = comments.map(comment => {
      const isCurrentUser = currentUserId && comment.user.toString() === currentUserId;
      const displayName = isCurrentUser ? comment.username : 'Anonymous';
      
      return {
        _id: comment._id,
        property: comment.property,
        user: comment.user,
        username: comment.username, // Keep original username for reference
        displayName: displayName, // This is what will be shown
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      };
    });

    return res.status(200).json(formattedComments);

  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Server error fetching comments' });
  }
};

