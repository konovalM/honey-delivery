const express = require('express');
const cors = require('cors');
const client = require('prom-client');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorite');
const cartRoutes = require('./routes/cart');

const app = express();
app.disable('x-powered-by');

// Настройка метрик prometheus
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Общее количество HTTP-запросов',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestCounter);

// middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://honey.local',
  'http://89.169.145.226',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });
  });
  next();
});

// роуты
app.get('/', (req, res) => {
  res.json({ message: 'Honey Shop API' });
});
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/cart', cartRoutes);

// ошибки
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// эндпоинт метрик
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

module.exports = app;