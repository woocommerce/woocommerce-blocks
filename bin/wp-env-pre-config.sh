#!/bin/sh

## get parent directory
npm run wp-env run tests-cli './wp-content/plugins/$(basename `pwd`)/bin/wp-env-config.sh'
