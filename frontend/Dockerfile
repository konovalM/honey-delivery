FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Копируем конфиг nginx (опционально)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]