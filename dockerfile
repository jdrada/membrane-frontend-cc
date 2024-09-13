FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

RUN npm run build

EXPOSE 4173

ENV VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3

CMD ["npm", "run", "preview"]
