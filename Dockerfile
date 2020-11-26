# Taken from https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/ifp_api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ENV HOST 0.0.0.0
EXPOSE 4000

# Start command
# .. serving with hot reload
#CMD [ "npm", "run", "dev"]
CMD npm run start
