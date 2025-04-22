require('dotenv').config();

module.exports = {
  PORT: process.env.APP_PORT,
  DB: {
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
  },
};