FROM node:20
WORKDIR /app
RUN npm install
COPY package*.json ./

COPY . .

ENV APP_ENV=production
ENV MODEL_URL="YOUR_BUCKET_FOLDER_MODEL"
ENV PROJECT_ID="YOUR_PROJECT_ID"
ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "run", "start"]
