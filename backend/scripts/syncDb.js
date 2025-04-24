const sequelize = require('../src/config/db');
require('../src/models'); // чтобы все модели были загружены

(async () => {
  try {
    await sequelize.sync({ force: true }); // или alter: true если хочешь
    console.log('✅ База данных успешно синхронизирована');
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка синхронизации БД:', error);
    process.exit(1);
  }
})();