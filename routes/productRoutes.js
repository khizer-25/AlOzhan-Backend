const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes for browsing products
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); // Admin only to add product

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct) // Admin only to edit
  .delete(protect, admin, deleteProduct); // Admin only to delete

// Protected customer review route
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;
