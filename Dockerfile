FROM node:4.5.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y php5-common php5-cli php5-gd GraphicsMagick ImageMagick


ADD node-app/ /usr/src/app/
RUN mkdir /usr/src/app/generated/

RUN npm install

CMD [ "npm", "start" ]
