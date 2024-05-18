FROM node:16-alpine

COPY my-proxy/package.json .
RUN npm install

COPY my-proxy/server.js .

CMD ["node", "server.js"]
