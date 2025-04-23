const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const cartController = require('../controllers/cart.controller');

router.use(auth);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.patch('/:productId', cartController.updateQuantity);
router.delete('/:productId', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

module.exports = router;