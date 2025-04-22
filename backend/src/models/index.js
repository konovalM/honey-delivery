const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const Product = require('./Product');
const User = require('./User');
const Favorite = require('./Favorite');

// Добавьте другие модели по мере необходимости

const db = {
  sequelize,
  Sequelize,
  Product,
  User,
  Product,
  Favorite
};

// Связи между моделями (если будут) добавляем здесь

User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Favorite, { foreignKey: 'productId', onDelete: 'CASCADE' });
Favorite.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = db;