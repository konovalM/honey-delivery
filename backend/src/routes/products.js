const express = require('express');
const { Product } = require('../models');
const router = express.Router();
const productController = require('../controllers/product.controller')

// Получить все товары
router.get('/', productController.getAllProducts);

// Получить один товар
router.get('/:id', productController.getProductById);

module.exports = router;