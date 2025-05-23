# backend/Dockerfile
FROM node:20
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]