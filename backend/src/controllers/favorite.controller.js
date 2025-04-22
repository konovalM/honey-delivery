const { Favorite, Product } = require('../models');

// Добавить в избранное
exports.addToFavorites = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const exists = await Favorite.findOne({ where: { userId, productId } });
    if (exists) return res.status(400).json({ message: 'Уже в избранном' });

    const favorite = await Favorite.create({ userId, productId });
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Удалить из избранного
exports.removeFromFavorites = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const favorite = await Favorite.findOne({ where: { userId, productId } });
    if (!favorite) return res.status(404).json({ message: 'Не найдено' });

    await favorite.destroy();
    res.json({ message: 'Удалено из избранного' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить избранное пользователя
exports.getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [{ model: Product, as: 'product' }],
    });
    res.json(favorites.map((favorite) => favorite.product));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/favorite.controller.js

exports.clearFavorites = async (req, res) => {
    const userId = req.user.id;
  
    try {
      await Favorite.destroy({ where: { userId } });
      res.json({ message: 'Избранное очищено' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };