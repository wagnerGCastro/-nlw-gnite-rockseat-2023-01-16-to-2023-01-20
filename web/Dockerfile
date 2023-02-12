# Common build stage
FROM node:18.14.0-alpine3.17 as common-build-stage

COPY ./ ./app

WORKDIR /app

RUN npm install -g npm@latest
RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3030 
EXPOSE 8080

# Production build stage
FROM common-build-stage as production-build-stage
ENV NODE_ENV production
CMD ["npm", "run", "preview"]
