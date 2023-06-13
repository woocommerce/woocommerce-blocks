#!/bin/sh

npm run wp-env start;
CONTAINER_ID=$(docker ps -qf name=tests-cli)
docker exec -t ${CONTAINER_ID} wp package install git@github.com:nielslange/woo-test-environment.git
docker exec -t ${CONTAINER_ID} wp woo-test-environment setup
docker exec -t ${CONTAINER_ID} wp db export export.sql
docker cp ${CONTAINER_ID}:/var/www/html/export.sql
