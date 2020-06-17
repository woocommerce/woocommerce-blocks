#!/bin/bash

## Check if user already exists
npm run wp-env run tests-cli wp user get customer 2> /dev/null

## if 0 is the exit code then we can leave otherwise we'll try creating the user
if [ $? -eq 0 ]
then
	exit 0
else
  npm run wp-env run tests-cli wp user create customer customer@woocommercecoree2etestsuite.com --user_pass=password --role=customer
  exit $?
fi
