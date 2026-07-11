const express = require('express');
const {
  getInventory,
  adjustInventory,
  getInventoryHistory,
  getCustomers,
  blockCustomer,
  issueCoupon,
  getReviews,
  updateReviewStatus,
  replyToReview,
  submitReturnRequest,
  getReturns,
  updateReturnRequest,
  getPaymentAnalytics,
  getAnalytics,
  getSettings,
  updateSettings
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Inventory routes
router.get('/inventory', protect, admin, getInventory);
router.put('/inventory/adjust', protect, admin, adjustInventory);
router.get('/inventory/history', protect, admin, getInventoryHistory);

// Customer routes
router.get('/customers', protect,admin, getCustomers);
router.put('/customers/:id/block', protect, admin, blockCustomer);
router.put('/customers/:id/coupon', protect, admin, issueCoupon);

// Review routes
router.get('/reviews', protect,admin, getReviews);
router.put('/reviews/:id/status', protect,admin, updateReviewStatus);
router.post('/reviews/:id/reply', protect,admin, replyToReview);

// Return & Refund routes
router.post('/returns/request', protect, submitReturnRequest); // User submission
router.get('/returns', protect,admin, getReturns);
router.put('/returns/:id', protect, admin,updateReturnRequest);

// Payment analytics routes
router.get('/payments/analytics', protect,admin, getPaymentAnalytics);


// System Configuration Settings
router.get('/settings', protect, admin,getSettings);
router.put('/settings', protect, admin, updateSettings);

// Business Analytics
router.get('/analytics', protect, admin, getAnalytics);

module.exports = router;
