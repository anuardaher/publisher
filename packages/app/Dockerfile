FROM node:14.16-alpine
RUN apk add --no-cache python2 g++ make
ENV APP_ROOT /app

WORKDIR ${APP_ROOT}
COPY . .

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0