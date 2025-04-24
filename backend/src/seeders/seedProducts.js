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
    {
      type: 'honey',
      title: 'Липовый мёд',
      description: 'Обладает антибактериальными свойствами, помогает при простуде.',
      price: 460,
      weight: 500,
    },
    {
      type: 'honey',
      title: 'Горный мёд',
      description: 'Собран в высокогорных районах, содержит редкие травы.',
      price: 600,
      weight: 500,
    },
    {
      type: 'honey',
      title: 'Донниковый мёд',
      description: 'Светлый и ароматный, особенно полезен при бессоннице.',
      price: 470,
      weight: 500,
    },
    {
      type: 'other',
      title: 'Маточное молочко',
      description: 'Ценный продукт пчеловодства для укрепления здоровья и энергии.',
      price: 950,
      weight: 30,
    },
    {
      type: 'other',
      title: 'Пчелиный воск',
      description: 'Используется в косметике и народной медицине.',
      price: 200,
      weight: 100,
    },
    {
      type: 'other',
      title: 'Крем с мёдом и прополисом',
      description: 'Натуральный крем для рук и тела на основе мёда.',
      price: 350,
      weight: 100,
    }
  ]);

  console.log('🌱 Данные успешно засеяны');
  process.exit();
}

seed().catch(err => {
  console.error('Ошибка при сидировании:', err);
  process.exit(1);
});
