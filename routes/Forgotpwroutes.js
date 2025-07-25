const express = require('express');
const router = express.Router();
const {forgotpassword} = require('../Controllers/Forgotpwcontroller');

router.post('/forgot-password',forgotpassword);

module.exports = router;