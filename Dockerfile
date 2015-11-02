FROM node:onbuild

WORKDIR /src
ADD . /src

RUN npm install -g pm2 gulp
RUN npm install --dev
RUN gulp build-prod

WORKDIR /src/dist

RUN npm install --production

EXPOSE 80
CMD ["pm2", "start", "server.js"]
