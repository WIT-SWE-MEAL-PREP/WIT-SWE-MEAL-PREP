FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install @material-ui/core
# RUN npm install @material-ui/icons

#RUN npm cache clean

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 80

ENTRYPOINT PORT=80 npm start

#test chenge

