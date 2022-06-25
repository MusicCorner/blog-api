# CMD ["./prune.sh"]

FROM node:16.15-alpine3.14 as blog-node
ENV NODE_ENV=development
WORKDIR /usr/src/app
# RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
COPY package*.json ./
RUN yarn
COPY . .
# RUN yarn migration:run
EXPOSE 3000
CMD yarn start:dev