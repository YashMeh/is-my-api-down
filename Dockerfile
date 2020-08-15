#Using an alpine version of node
FROM node:8.7.0-alpine

#Create app directory and use it as the working directory
RUN mkdir -p /status-bot
WORKDIR /status-bot

#Copying the package files from localstorage to image
COPY package.json /status-bot
COPY package-lock.json /status-bot

#Installing dependencies
RUN npm install

#Copying all the files from localstorage to image
COPY . /status-bot

#Starting the server using nodemon
CMD ["npm","run","bot"]