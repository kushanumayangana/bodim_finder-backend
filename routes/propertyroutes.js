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
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
// Multer with file size limit and image-only filter
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  }
});

// Create a new property (protected route) – allow up to 10 images
// Accept files under 'images' or 'image' field names to be more tolerant of client-side field naming
router.post('/create', authMiddleware, upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'image', maxCount: 10 }
]), propertyController.createProperty);

// Get all properties
router.get('/all', propertyController.getAllProperties);

// Get properties by university
router.get('/university/:university', propertyController.getPropertiesByUniversity);

// Get properties by user
router.get('/user/:userId', propertyController.getPropertiesByUser);

// Get property by ID
router.get('/:id', propertyController.getPropertyById);

// Update property (must come after more specific routes) – allow updating images too
// Accept multiple files under 'images' or 'image'
router.put('/:id', authMiddleware, upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'image', maxCount: 10 }
]), propertyController.updateProperty);

// Delete property (must come after more specific routes)
router.delete('/:id', authMiddleware, propertyController.deleteProperty);

module.exports = router;
