// seeders/seedAdmin.js
const sequelize = require('../config/db');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

async function seed() {
  await sequelize.sync({ alter: true }); // НЕ force — не сносит таблицы

  const existingAdmin = await User.findOne({ where: { email: 'admin@honey.com' } });

  if (existingAdmin) {
    console.log('ℹ️ Админ уже существует:', existingAdmin.email);
    process.exit();
  }

  const hash = await bcrypt.hash('admin123', 10);

  await User.create({
    firstName: 'Admin',
    lastName: 'User',
    middleName: '',
    phone: '89991112233',
    email: 'admin@honey.com',
    password: hash,
    role: 'admin',
  });

  console.log('✅ Админ создан: admin@honey.com');
  process.exit();
}

seed().catch(err => {
  console.error('❌ Ошибка при сидировании админа:', err);
  process.exit(1);
});