FROM node:18
WORKDIR /usr/app
COPY package.json /usr/app/
RUN npm install
COPY . . 
EXPOSE 4000
CMD ["npm", "start"]