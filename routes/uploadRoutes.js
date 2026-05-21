const path = require('path');
const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Standardize file path separators to slashes
    const filePath = req.file.path.replace(/\\/g, '/');
    res.status(201).json({
      message: 'Image uploaded successfully',
      image: `/${filePath}`,
    });
  });
});

module.exports = router;
