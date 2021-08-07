FROM node:14

WORKDIR /usr/app/src

ENV NODE_ENV=production

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "index.js", "--name", "url-shortener"]
