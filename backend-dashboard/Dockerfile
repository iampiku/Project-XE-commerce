FROM node

RUN apt-get update && apt-get install -y curl

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . .

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 8080