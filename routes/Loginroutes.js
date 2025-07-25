const express = require('express');
const router = express.Router();
const { loginUser } = require('../Controllers/Logincontroller');

router.post('/login', loginUser);

module.exports = router;
