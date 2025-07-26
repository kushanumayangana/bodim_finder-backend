const express = require('express');
const router = express.Router();
const { registerUser,verifyOtp } = require('../Controllers/Registercontroller');

// POST /api/users/register
router.post('/register', registerUser);
router.post('/verify-otp',verifyOtp)

module.exports = router;
