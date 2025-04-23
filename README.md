# 🍯 Honey Delivery — интернет-магазин продуктов пчеловодства

Проект сделан в рамках лабораторной работы №1 по курсу DevOps.  


## 📦 Функциональность

- Авторизация и регистрация пользователей (JWT)
- Просмотр каталога товаров (мёд, прополис, соты и др.)
- Добавление товаров в избранное и корзину
- Ролевая модель системы (админ и юзер)
- Развёртывание через Docker (бэкенд + база данных)
- Работа с REST API
- Весь проект покрыт системой контроля версий (Git)
- Настроен CI через GitHub Actions (этапы: build + test)

## 🧪 Технологии


### Backend:
- Node.js + Express
- PostgreSQL
- Sequelize
- JWT (авторизация)
- Docker
- Jest (тестирование)

### Frontend:
- React + Vite
- TypeScript
- Axios + Zustand + React Query
- Ant Design
- SCSS-модули
- Jest, react-testing-library (тестирование)

## ⚙️ Как запустить 
```bash
git clone https://github.com/your-username/honey-delivery.git
cd honey-delivery/backend
cp .env.example .env
docker-compose up --build
```
## ⚙️ Frontend
```bash
cd ../frontend
npm install
npm run dev
```


