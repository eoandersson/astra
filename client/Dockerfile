# base image
FROM node:12.2.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app
RUN npm install --silent

ADD src /usr/src/app/src
ADD public /usr/src/app/public

# start app
CMD ["npm", "start"]