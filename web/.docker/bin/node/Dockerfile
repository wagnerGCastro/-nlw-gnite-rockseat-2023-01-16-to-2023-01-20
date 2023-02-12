# https://hub.docker.com/_/node/tags?page=1&name=18
# Common build stage
FROM node:18.14.0-alpine3.17 as common-build-stage

RUN apk add --no-cache bash

RUN npm install -g npm@latest

WORKDIR /var/www

EXPOSE 3030
ENV HOST 0.0.0.0

# Dvelopment build stage
# FROM common-build-stage as development-build-stage
# ENV NODE_ENV development
# CMD ["nodemon", "--exec", "npm", "run", "dev"]

