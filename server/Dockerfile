# مرحله 1: ساخت
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# مرحله 2: اجرا
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]
