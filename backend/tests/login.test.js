const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/db');

beforeAll(async () => {
  // await sequelize.sync({ force: true });

  // Регистрируем пользователя для логина
  await request(app).post('/api/auth/register').send({
    firstName: 'Логин',
    lastName: 'Пользователь',
    middleName: 'Тестович',
    phone: '89997776655',
    email: 'login@example.com',
    password: '123456',
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth API - Login', () => {
  it('должен авторизовать пользователя с корректными данными', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: '123456',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('login@example.com');
  });

  it('должен вернуть 400 при несуществующем email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'noone@nowhere.com',
      password: '123456',
    });
  
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Пользователь не найден');
  });

  it('должен вернуть 401 при неверном пароле', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: 'wrongpassword',
    });
  
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Неверный пароль');
  });
});