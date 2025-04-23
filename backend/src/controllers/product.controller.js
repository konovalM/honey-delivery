const { Op } = require('sequelize');
const { Product } = require('../models');

// Получить все товары
exports.getAllProducts = async (req, res) => {
    const { type, minPrice, maxPrice, sort } = req.query;
  
    const where = {};
  
    if (type) {
      where.type = type;
    }
  
    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice && { [Op.gte]: +minPrice }),
        ...(maxPrice && { [Op.lte]: +maxPrice }),
      };
    }
  
    const order = [];
  
    if (sort === 'price_asc') {
      order.push(['price', 'ASC']);
    } else if (sort === 'price_desc') {
      order.push(['price', 'DESC']);
    }
  
    const products = await Product.findAll({ where, order });
  
    res.json(products);
  };

// Получить один товар по id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};