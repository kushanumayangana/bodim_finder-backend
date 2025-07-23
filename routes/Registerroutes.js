const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/Registercontroller');

// POST /api/users/register
router.post('/register', registerUser);

module.exports = router;
