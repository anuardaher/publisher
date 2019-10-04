FROM node:10.16-slim

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
COPY . ${APP_ROOT}

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0