const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  const token = authHeader.split(' ')[1]; // формат: "Bearer <токен>"

  if (!token) {
    return res.status(401).json({ message: 'Формат токена некорректен' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // добавляем пользователя в объект запроса
    next(); // передаём управление дальше
  } catch (err) {
    return res.status(401).json({ message: 'Невалидный или просроченный токен' });
  }
};