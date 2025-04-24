const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/db');
const { Product } = require('../src/models'); // если нужно напрямую

let mayHoneyId;

beforeAll(async () => {
//   await sequelize.sync({ force: true });

  // Сидим пару продуктов
  const products = await Product.bulkCreate([
    {
      type: 'honey',
      title: 'Майский мёд',
      description: 'Натуральный мёд из весенних цветов.',
      price: 450,
      weight: 500,
    },
    {
      type: 'propolis',
      title: 'Прополис очищенный',
      description: 'Для иммунитета.',
      price: 250,
      weight: 100,
    },
  ]);

  mayHoneyId = products[0].id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Products API', () => {
  it('должен вернуть все продукты', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(res.body[0]).toHaveProperty('title');
  });

  it('должен вернуть продукт по id', async () => {
    const res = await request(app).get(`/api/products/${mayHoneyId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', mayHoneyId);
    expect(res.body).toHaveProperty('title', 'Майский мёд');
  });

  it('должен вернуть 404 при несуществующем продукте', async () => {
    const res = await request(app).get('/api/products/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});