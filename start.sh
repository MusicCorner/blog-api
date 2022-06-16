#!/bin/bash

docker system prune -f &
docker-compose up --build