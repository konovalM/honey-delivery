const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const Product = require('./Product');
const User = require('./User');
const Favorite = require('./Favorite');
const CartItem = require('./CartItem');


// Добавьте другие модели по мере необходимости

const db = {
  sequelize,
  Sequelize,
  Product,
  User,
  Favorite,
  CartItem
};

// Связи между моделями (если будут) добавляем здесь

// Favorite
User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Favorite, { foreignKey: 'productId', onDelete: 'CASCADE' });
Favorite.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// CartItem
User.hasMany(CartItem, { foreignKey: 'userId', onDelete: 'CASCADE' });
CartItem.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(CartItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });


module.exports = db;