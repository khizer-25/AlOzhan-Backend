const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Order creation and full listing
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

// Specific customer history listing
router.route('/myorders').get(protect, getMyOrders);

// Specific order details and actions
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
