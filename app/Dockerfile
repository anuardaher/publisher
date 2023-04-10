FROM node:10.16-alpine

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
COPY . ${APP_ROOT}

RUN apk add --no-cache python2 g++ make

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0