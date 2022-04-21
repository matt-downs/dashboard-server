FROM node:17
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --system app
COPY . .
RUN npm install
RUN chown -R app /opt/app
USER app
EXPOSE 3000
CMD [ "npm", "run", "dev" ]