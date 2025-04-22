const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Регистрация
router.post('/register', authController.register);

// Авторизация
router.post('/login', authController.login);

// Получение данных о текущем пользователе (только с токеном)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;