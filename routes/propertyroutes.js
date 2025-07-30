const express = require('express');
const router = express.Router();
const multer = require('multer');
const propertyController = require('../controllers/propertycontroller'); // ✅ ensure lowercase 'controllers'

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

// Create a new property
router.post('/', upload.single('image'), propertyController.createProperty);

// Get all properties
router.get('/', propertyController.getAllProperties);

// Get properties by university
router.get('/university/:university', propertyController.getPropertiesByUniversity);

module.exports = router;
