FROM node:18

ENV REDIS_HOST 10.1.1.199
ENV REDIS_PASSWORD 1iEnogYxaf
ENV REDIS_PORT 6379

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "node", "swagger.js" ]