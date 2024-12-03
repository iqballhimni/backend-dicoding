FROM node:18
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_ENV=production
ENV APP_PORT=8080
ENV MODEL_URL="https://storage.googleapis.com/storage-models-mlgc/load-models/model.json"
ENV APP_PORT=""

CMD [ "npm", "start" ]

EXPOSE 8080