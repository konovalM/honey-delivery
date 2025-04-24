const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/db');
const { Product } = require('../src/models');

let token;
let productId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Регистрация и логин пользователя
  await request(app).post('/api/auth/register').send({
    firstName: 'Cart',
    lastName: 'User',
    phone: '89990001122',
    email: 'cart@test.com',
    password: 'testpass',
  });

  const login = await request(app).post('/api/auth/login').send({
    email: 'cart@test.com',
    password: 'testpass',
  });

  token = login.body.token;

  // Прямо создаем товар
  const product = await Product.create({
    title: 'Тестовый мёд',
    description: 'Тест для корзины',
    price: 500,
    weight: 500,
    type: 'honey',
  });

  productId = product.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Cart API', () => {
  it('должен добавить товар в корзину', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 2 });

    expect(res.statusCode).toBe(201);
    expect(res.body.quantity).toBe(2);
  });

  it('должен получить корзину', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  it('должен обновить количество товара', async () => {
    const res = await request(app)
      .patch(`/api/cart/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(5);
  });

  it('должен вернуть сумму корзины', async () => {
    const res = await request(app)
      .get('/api/cart/total')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(500 * 5);
  });

  it('должен удалить товар из корзины', async () => {
    const res = await request(app)
      .delete(`/api/cart/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Удалено из корзины');
  });
});