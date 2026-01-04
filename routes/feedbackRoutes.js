const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  getFeedbackByUsername
} = require('../Controllers/feedbackController');

// POST /api/feedback - Create new feedback
router.post('/', createFeedback);

// GET /api/feedback - Get all feedback
router.get('/', getAllFeedback);

// GET /api/feedback/:username - Get feedback by specific username
router.get('/:username', getFeedbackByUsername);

module.exports = router;
