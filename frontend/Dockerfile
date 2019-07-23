FROM node:12.3.1

WORKDIR /frontend

COPY /package.json package.json
COPY /yarn.lock yarn.lock
RUN yarn install

COPY /public public
COPY /src src

CMD ["yarn", "start"]
