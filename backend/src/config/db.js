const { Sequelize } = require('sequelize');
const { DB } = require('./config'); // импорт из config.js

const dbName = process.env.NODE_ENV === 'test' ? 'honey_test' : DB.NAME;

const sequelize = new Sequelize(
  dbName,
  DB.USER,
  DB.PASSWORD,
  {
    host: DB.HOST,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;