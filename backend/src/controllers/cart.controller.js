const { CartItem, Product } = require('../models');

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  const items = await CartItem.findAll({
    where: { userId },
    include: [{ model: Product, as: 'product' }],
  });

  const cart = items.map(item => ({
    id: item.id,
    quantity: item.quantity,
    product: item.product,
    subtotal: item.quantity * item.product.price,
  }));

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

  res.json({ items: cart, total });
};

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;

  const existing = await CartItem.findOne({ where: { userId, productId } });

  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return res.json(existing);
  }

  const newItem = await CartItem.create({ userId, productId, quantity });
  res.status(201).json(newItem);
};

exports.updateQuantity = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  const item = await CartItem.findOne({ where: { userId, productId } });

  if (!item) return res.status(404).json({ message: 'Товар не найден в корзине' });

  item.quantity = quantity;
  await item.save();
  res.json(item);
};

exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const item = await CartItem.findOne({ where: { userId, productId } });
  if (!item) return res.status(404).json({ message: 'Товар не найден в корзине' });

  await item.destroy();
  res.json({ message: 'Удалено из корзины' });
};

exports.clearCart = async (req, res) => {
  const userId = req.user.id;
  await CartItem.destroy({ where: { userId } });
  res.json({ message: 'Корзина очищена' });
};