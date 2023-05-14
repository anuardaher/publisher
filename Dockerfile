FROM node:16.14.2-alpine

RUN apk add --no-cache python3 g++ make

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./packages/*/package.json /app/packages/*/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install
COPY . .
RUN yarn build