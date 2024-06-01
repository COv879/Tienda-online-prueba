const express = require('express');
const router = express.Router();
const productController = require('../controllers/proyectController');

router.get('/products', productController.getProducts);
router.get('/products/search', productController.searchProducts);

module.exports = router;
