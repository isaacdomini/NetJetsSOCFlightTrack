#!/bin/bash
docker-compose build
docker-compose run app rails db:create
