# Blog-API

## Requirements
- [Docker](https://docs.docker.com/get-docker/Docker)
- [Docker compose](https://docs.docker.com/compose/install/)

## Start
`bash start.sh`

## Development
### Migrations and entities
After changing entities (typeorm models) - generate migrations with `yarn migration:generate` in docker web (node js) container and run those migrations with `yarn migration:run`