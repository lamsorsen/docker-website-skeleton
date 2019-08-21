FROM node:12.7.0-alpine

WORKDIR /frontend

RUN yarn global add serve

COPY /package.json package.json
COPY /yarn.lock yarn.lock
RUN yarn install

COPY /webpack.common.js webpack.common.js
COPY /webpack.dev.js webpack.dev.js
COPY /webpack.prod.js webpack.prod.js
COPY /.babelrc .babelrc
COPY /serve.json serve.json

COPY /app app

ARG ENVIRONMENT="PRODUCTION"
RUN if test "${ENVIRONMENT}" = "PRODUCTION"; then echo "Running production build"; yarn build; fi

CMD ["serve", "-l", "3000"] # The default command is always to use serve. This can be overridden in the docker-compose.
