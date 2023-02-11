

# Build image
FROM node:18.13.0 as common-build-stage
WORKDIR /app

COPY package*.json ./
RUN npm run build

COPY --chown=node:node --from=common-build-stage /app/prisma /app/prisma
COPY --chown=node:node --from=common-build-stage /app/src /app/src

USER node

EXPOSE 3333
ENV HOST 0.0.0.0

FROM common-build-stage as development-build-stage
CMD ["node", "src/index.js"]
