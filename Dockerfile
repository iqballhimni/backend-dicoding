FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_ENV=production
ENV MODEL_URL="https://storage.googleapis.com/storage-models-mlgc/load-models/model.json"
ENV PROJECT_ID="sertamulia-443609"
ENV PORT=8080

EXPOSE 8080
CMD [ "npm", "run", "start"]
