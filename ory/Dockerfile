FROM node:16-alpine as build

WORKDIR /app

RUN npm install @ory/cli

COPY ory/ory-cloud.json /root/.ory-cloud.json
CMD ["npx", "@ory/cli", "tunnel", "http://localhost:3000", "--dev", "--project", "optimistic-colden-mvqt2d0ik7", "--quiet"]
