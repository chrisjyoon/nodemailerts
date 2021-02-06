FROM node:15-slim

WORKDIR /mailer

COPY package.json /mailer/package.json

RUN npm install

COPY . /mailer

CMD ["npm", "start"]

EXPOSE 8000