FROM node:19.9.0-alpine

ARG APP_ROOT

RUN apk update && apk add bash

COPY . $APP_ROOT

WORKDIR $APP_ROOT

RUN npm install -g npm
RUN npm install -g db-migrate db-migrate-pg

RUN npm install

CMD bash -c "db-migrate up && npm run dev"
