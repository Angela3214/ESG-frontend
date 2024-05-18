FROM node:16-alpine as build

COPY package.json .
RUN npm install

COPY src/ /src/
COPY public/ /public/
COPY tsconfig.json .
COPY tailwind.config.js .

RUN npm run build

CMD ["npm", "run", "start"]
