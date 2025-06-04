FROM node:20

WORKDIR /app  

# 3. Копируем файлы зависимостей
COPY package*.json ./ 

# 4. Устанавливаем зависимости
RUN npm install  

# 5. Копируем ВЕСЬ проект
COPY . .  

# 6. Открываем порт
EXPOSE 3000 

# 7. Команда запуска
CMD ["npm", "start"]  