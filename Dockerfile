FROM node:16.15-alpine3.14 as blog-node

ARG NODE_ENV
ARG NODE_WORKDIR
ENV NODE_ENV ${NODE_ENV}
ENV NODE_WORKDIR ${NODE_WORKDIR}
WORKDIR ${NODE_WORKDIR}

COPY package*.json ./
RUN yarn install --production
COPY . .
EXPOSE 3000
CMD yarn start-node-server:${NODE_ENV}