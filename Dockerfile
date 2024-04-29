# Используем offical Node.js 14 образ в качестве базового образа
FROM node:16-alpine

# Устанавливаем рабочую директорию внутри контейнера
RUN mkdir /src

WORKDIR /src

# Копируем зависимости и файл package.json в контейнер
COPY package.json package-lock.json .

# Устанавливаем зависимости
RUN npm install 

# Копируем все файлы проекта в контейнер
COPY . .

RUN npm run build

# Делаем порт 80 доступным извне контейнера
# Запускаем приложение
CMD ["npx", "serve", "-s", "build", "-l", "5173"]
