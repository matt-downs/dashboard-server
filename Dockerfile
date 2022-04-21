# syntax=docker/dockerfile:1

FROM node:17

WORKDIR /app
COPY package.json package-lock.json /app
RUN npm install

COPY . /app

EXPOSE 3000
CMD [ "npm", "run", "dev" ]