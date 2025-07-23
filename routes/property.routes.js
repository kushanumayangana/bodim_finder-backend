const express = require('express');
const router = express.Router();
const multer = require('multer');
const propertyController = require('../controllers/property.controller');

// File Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
  }
});
const upload = multer({ storage });

// POST: Create property
router.post('/', upload.single('image'), propertyController.createProperty);

module.exports = router;
