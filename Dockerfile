# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

# Install dependencies as a seperate step to take advantage of build caching 
COPY package.json /app
COPY package-lock.json /app
RUN npm install

# Then copy the rest of the app in and build it
COPY . /app
RUN npm run build-prod

EXPOSE 3000
CMD [ "npm", "run", "prod" ]