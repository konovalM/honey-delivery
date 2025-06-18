const request = require('supertest');
const app = require('../src/app');

describe('App setup', () => {
  it('should return 404 on unknown route', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
  });

  it('should respond to root or healthcheck', async () => {
    const res = await request(app).get('/api/products'); // или другой существующий GET
    expect([200, 401]).toContain(res.statusCode); // допускаем auth middleware
  });
});