# Blog-API

## Requirements
- [Docker](https://docs.docker.com/get-docker/Docker)
- [Docker compose](https://docs.docker.com/compose/install/)

## Start
`bash start.sh`

## Development
After changing entities (typeorm models) - generatde migrations with `yarn migration:generate` in docker web (node js) container and run those migrations with `yarn migration:run`