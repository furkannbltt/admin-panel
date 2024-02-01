FROM node:latest

LABEL name="turcotravel"
ENV APP_PORT=3000 APP_DIR=/app

WORKDIR /app

ADD package.json .
ADD package-lock.json .
ADD . .

RUN yarn 
COPY . .
RUN yarn build 

EXPOSE 3000

CMD ["yarn", "start"]