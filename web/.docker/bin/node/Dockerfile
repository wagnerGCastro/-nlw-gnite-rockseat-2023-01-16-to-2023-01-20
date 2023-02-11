# Common build stage
FROM node:16.10.0 as common-build-stage

# RUN apk add --no-cache bash

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm install -g npm@9.4.1

WORKDIR /var/www

EXPOSE 3030
ENV HOST 0.0.0.0

# Dvelopment build stage
FROM common-build-stage as development-build-stage
ENV NODE_ENV development
CMD ["npm", "run", "dev"]

