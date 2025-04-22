const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const favoriteController = require('../controllers/favorite.controller');

router.use(auth); // все маршруты защищены

router.get('/', favoriteController.getFavorites);
router.post('/', favoriteController.addToFavorites);
router.delete('/:productId', favoriteController.removeFromFavorites);
router.delete('/', favoriteController.clearFavorites);

module.exports = router;