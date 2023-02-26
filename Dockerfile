# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app
COPY . /app
RUN npm install

RUN npm run build-prod

EXPOSE 3000
CMD [ "npm", "run", "prod" ]