const request = require('supertest');
const app = require('../src/app');

describe('App setup and core endpoints', () => {
  it('should return 200 and welcome message on root', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Honey Shop API');
  });

  it('should return Prometheus metrics on /metrics', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.text).toContain('http_requests_total');
  });

  it('should return 404 on unknown route', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
  });

  it('should respond to existing route /api/products', async () => {
    const res = await request(app).get('/api/products');
    expect([200, 401]).toContain(res.statusCode); // если есть middleware auth
  });

  it('should allow CORS for allowed origin', async () => {
    const res = await request(app)
      .get('/')
      .set('Origin', 'http://localhost:3000');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });
});