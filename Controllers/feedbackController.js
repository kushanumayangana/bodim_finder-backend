const Feedback = require('../models/Feedback');

// Create new feedback
const createFeedback = async (req, res) => {
  try {
    const { username, feedback } = req.body;

    // Validation
    if (!username || !feedback) {
      return res.status(400).json({
        success: false,
        message: 'Username and feedback are required'
      });
    }

    if (feedback.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Feedback cannot be empty'
      });
    }

    // Create new feedback
    const newFeedback = new Feedback({
      username,
      feedback: feedback.trim()
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: savedFeedback
    });

  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .select('username feedback createdAt');

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get feedback by username
const getFeedbackByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const feedbacks = await Feedback.find({ username })
      .sort({ createdAt: -1 })
      .select('username feedback createdAt');

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });

  } catch (error) {
    console.error('Error fetching user feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  getFeedbackByUsername
};
