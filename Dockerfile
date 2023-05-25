FROM node:lts-alpine
WORKDIR /app
COPY package.json .
COPY . .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY package.json .