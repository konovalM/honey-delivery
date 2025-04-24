// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // подключение к БД

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.ENUM('honey', 'propolis', 'pollen', 'honeycomb', 'other'),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT, // в граммах
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Product;
