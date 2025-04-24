const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorite');
const cartRoutes = require('./routes/cart');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// все роуты
app.get('/', (req, res) => {
  res.json({ message: 'Honey Shop API' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/cart', cartRoutes);

// хэндлинг ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
