FROM node:18.14.0-alpine3.17 as common-build-stage

# https://www.cyberciti.biz/faq/how-to-install-curl-on-alpine-linux/
RUN apk --no-cache add curl bash
RUN apk add --update --no-cache && apk add openssl1.1-compat

WORKDIR /app

COPY package.json /app

RUN npm install -g npm@latest
RUN npm install -g tsx
RUN npm install

COPY . /app

RUN npm run build

COPY prisma/migrations /app/build/prisma/migrations
COPY prisma/schema.prisma /app/build/prisma/schema.prisma

# Prisma  Create tables
RUN npx prisma migrate dev

# Prisma run sedd
# RUN npx prisma db seed

EXPOSE 3333
ENV HOST 0.0.0.0

# Production build stage
FROM common-build-stage as production-build-stage
ENV NODE_ENV production
CMD ["npm", "run", "start"]

