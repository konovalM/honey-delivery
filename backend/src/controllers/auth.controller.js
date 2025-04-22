const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

exports.register = async (req, res) => {
    try {
      const { firstName, lastName, middleName, phone, email, password, role } = req.body;
  
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }
  
      const existingPhone = await User.findOne({ where: { phone } });
      if (existingPhone) {
        return res.status(400).json({ message: 'Пользователь с таким номером телефона уже существует' });
      }
  
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        middleName,
        phone,
        email,
        password: hash,
        role,
      });
  
      const token = generateToken(user);
      res.json({ token, user });
    } catch (err) {
      res.status(500).json({ message: 'Ошибка регистрации', error: err.message });
    }
  };
  

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Неверный пароль' });

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка входа', error: err.message });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] } 
  });

  res.json(user);
};
