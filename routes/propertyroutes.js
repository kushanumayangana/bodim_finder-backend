const express = require('express');
const router = express.Router();
const multer = require('multer');
const propertyController = require('../Controllers/propertycontroller'); 
const authMiddleware = require('../middleware/authMiddleware'); 

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

// Create a new property (protected route)
router.post('/create', authMiddleware, upload.single('image'), propertyController.createProperty);

// Get all properties
router.get('/all', propertyController.getAllProperties);

// Get properties by university
router.get('/university/:university', propertyController.getPropertiesByUniversity);

// Get properties by user
router.get('/user/:userId', propertyController.getPropertiesByUser);

// Get property by ID
router.get('/:id', propertyController.getPropertyById);

// Update property (must come after more specific routes)
router.put('/:id', authMiddleware, upload.single('image'), propertyController.updateProperty);

// Delete property (must come after more specific routes)
router.delete('/:id', authMiddleware, propertyController.deleteProperty);

module.exports = router;
