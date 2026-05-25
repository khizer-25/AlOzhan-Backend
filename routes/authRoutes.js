const express = require('express');
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const sendEmail = require('../controllers/send-email');

const router = express.Router();

// Public routes
router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/email', sendEmail);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
