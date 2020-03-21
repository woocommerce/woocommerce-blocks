#!/usr/bin/env bash

docker-compose up --detach db
docker-compose up --detach --build wordpress-unit-tests
