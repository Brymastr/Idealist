FROM dockerfile/nodejs-bower-gulp

WORKDIR /src
ADD . /src

RUN gulp build-prod

WORKDIR /src/dist

RUN npm install
RUN bower install --allow-root

RUN npm install -g pm2

EXPOSE 80
CMD ["pm2", "start", "server.js"]