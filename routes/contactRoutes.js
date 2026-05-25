const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getContactMessages,
  deleteContactMessage,
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to send a message
router.post('/', submitContactMessage);

// Protected Admin routes to read/manage messages
router.get('/', protect, admin, getContactMessages);
router.delete('/:id', protect, admin, deleteContactMessage);

module.exports = router;
