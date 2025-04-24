
const request = require('supertest');
const app = require('../src/app'); // путь к express-приложению
const sequelize = require('../src/config/db'); // или ../models если не в src

beforeAll(async () => {
  // await sequelize.sync({ force: true }); // чистая база перед тестами
});

describe('Auth API', () => {
  it('должен зарегистрировать нового пользователя', async () => {
    const res = await request(app).post('/api/auth/register').send({
      firstName: 'Тест',
      lastName: 'Юзер',
      middleName: 'Проверочный',
      phone: '89998887766',
      email: 'test@example.com',
      password: '123456',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
  });
});