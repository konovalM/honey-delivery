require('dotenv').config(); 
const app = require('./app');
const { PORT, DB } = require('./config/config');
const db = require('./models'); // импорт index.js с моделями

(async () => {
  try {
    await db.sequelize.authenticate(); // Проверка подключения
    console.log('✅ Подключение к БД успешно');

    // Создание таблиц по моделям
    await db.sequelize.sync({ alter: true }); 
    console.log('✅ Все модели синхронизированы');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Сервер запущен на http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Ошибка при подключении к БД или запуске сервера:', error);
  }
})();
