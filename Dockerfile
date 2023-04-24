FROM node:19.9.0-alpine

ARG APP_ROOT

RUN apk update && apk add bash

COPY . $APP_ROOT

WORKDIR $APP_ROOT

RUN npm install -g npm

RUN npm install

CMD ["npm", "run", "dev"]
