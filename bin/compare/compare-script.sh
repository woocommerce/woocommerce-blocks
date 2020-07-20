#!/bin/bash

BEFORE_BRANCH=$1
AFTER_BRANCH=$2

git checkout $BEFORE_BRANCH > /dev/null
npm install > /dev/null
npm run build:map > /dev/null
npm run explore ./build/*-frontend.js -- --json before.json > /dev/null


git checkout $AFTER_BRANCH > /dev/null
npm install > /dev/null
npm run build:map > /dev/null
npm run explore ./build/*-frontend.js -- --json after.json > /dev/null

echo
echo "-------------------------------------------"
echo

node ./bin/compare/compare-script.js
