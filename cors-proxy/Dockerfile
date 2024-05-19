FROM node:16-alpine

COPY cors-proxy/package.json .
RUN npm install

COPY cors-proxy/server.js .

CMD ["node", "server.js"]
