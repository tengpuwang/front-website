FROM node

RUN mkdir -p /tengpuwang

WORKDIR /tengpuwang

COPY app app
COPY assets assets
COPY build build
COPY views views

COPY .babelrc .babelrc
COPY gulpfile.js gulpfile.js
COPY log4js.json log4js.json
COPY package.json package.json
COPY server.js server.js
COPY webpack.config.js webpack.config.js

RUN npm install --no-optional --registry=https://registry.npm.taobao.org

EXPOSE 3000
CMD ["npm", "run", "dev"]