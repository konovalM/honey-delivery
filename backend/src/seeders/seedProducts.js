// seeders/seedProducts.js
const sequelize = require('../config/db');
const Product = require('../models/Product');

async function seed() {
  await sequelize.sync({ force: true }); // очистка и пересоздание таблиц

  await Product.bulkCreate([
    {
      type: 'honey',
      title: 'Майский мёд',
      description: 'Натуральный мёд из весенних цветов.',
      price: 450,
      weight: 500,
    },
    {
      type: 'honey',
      title: 'Гречишный мёд',
      description: 'Тёмный и насыщенный вкус.',
      price: 480,
      weight: 500,
    },
    {
      type: 'honey',
      title: 'Цветочный мёд',
      description: 'Мед с полевых цветов.',
      price: 400,
      weight: 500,
    },
    {
      type: 'honey',
      title: 'Акациевый мёд',
      description: 'Мед с деревьев Акации. Никогда не кристаллизуется!',
      price: 550,
      weight: 500,
    },
    {
      type: 'propolis',
      title: 'Прополис очищенный',
      description: 'Используется для укрепления иммунитета.',
      price: 250,
      weight: 100,
    },
    {
      type: 'pollen',
      title: 'Пыльца цветочная',
      description: 'Богатый источник витаминов.',
      price: 300,
      weight: 200,
    },
    {
      type: 'honeycomb',
      title: 'Медовые соты',
      description: 'Натуральные пчелиные соты с мёдом.',
      price: 600,
      weight: 400,
    },
  ]);

  console.log('🌱 Данные успешно засеяны');
  process.exit();
}

seed().catch(err => {
  console.error('Ошибка при сидировании:', err);
  process.exit(1);
});
