FROM node:16.20.2 

WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ["package.json", "pnpm-lock.yaml", "./"]
COPY prisma ./prisma/

# Install app dependencies
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

CMD [ "pnpm", "start" ]