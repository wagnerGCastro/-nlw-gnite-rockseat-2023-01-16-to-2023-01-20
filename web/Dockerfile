# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage
# RUN apk add  --no-cache ffmpeg

COPY ./ ./app

WORKDIR /app

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3030

# Production build stage
FROM common-build-stage as production-build-stage
ENV NODE_ENV production
CMD ["npm", "run", "dev"]
