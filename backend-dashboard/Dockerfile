FROM node

RUN npm install -g npm@7.11.1

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
