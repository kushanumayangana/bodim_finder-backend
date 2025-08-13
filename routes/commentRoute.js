const express = require('express');
const router = express.Router();

const commentController = require('../Controllers/commentController'); // lowercase 'controllers'
const authMiddleware = require('../middleware/authMiddleware');

// Protect POST route with auth middleware, GET route is public
router.post('/:id/comment', authMiddleware, commentController.createComment);
router.get('/:id/comments', commentController.getComments);

module.exports = router;
