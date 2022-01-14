FROM node:16.13.2 

WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ["package.json", "yarn.lock", "./"]
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install --pure-lockfile

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]