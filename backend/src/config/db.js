const { Sequelize } = require('sequelize');
const { DB } = require('./config'); // импорт из нового config.js

const sequelize = new Sequelize(
  DB.NAME,
  DB.USER,
  DB.PASSWORD,
  {
    host: DB.HOST,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;

