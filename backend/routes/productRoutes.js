const express = require('express');
const router = express.Router();
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

// Get all products and create new product
router.route('/')
  .get(getAllProducts)
  .post(createProduct);

// Get, update, and delete a single product
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;