# syntax=docker/dockerfile:1

FROM node:18

WORKDIR /app
COPY package.json package-lock.json /app
RUN npm install

COPY . /app

RUN npm run build-prod

EXPOSE 3000
CMD [ "npm", "run", "prod" ]