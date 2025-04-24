const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/db');
const { Product } = require('../src/models');

let token;
let productId;

beforeAll(async () => {
  // await sequelize.sync({ force: true });

  // Рега
  await request(app).post('/api/auth/register').send({
    firstName: 'Favorite',
    lastName: 'User',
    phone: '89990001111',
    email: 'favorite@test.com',
    password: 'testpass',
  });

  // Логин
  const loginRes = await request(app).post('/api/auth/login').send({
    email: 'favorite@test.com',
    password: 'testpass',
  });

  token = loginRes.body.token;

  // добавляем в бд продукт
  const product = await Product.create({
    title: 'Мёд тестовый',
    description: 'Для тестов избранного',
    price: 450,
    weight: 500,
    type: 'honey',
  });

  productId = product.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Favorites API', () => {
  it('должен добавить товар в избранное', async () => {
    const res = await request(app)
      .post('/api/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('productId', productId);
  });

  it('должен получить список избранного', async () => {
    const res = await request(app)
      .get('/api/favorites')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('должен удалить товар из избранного', async () => {
    const res = await request(app)
      .delete(`/api/favorites/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Удалено из избранного');
  });
});