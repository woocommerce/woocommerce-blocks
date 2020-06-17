#!/bin/bash

## Check if user already exists
npm run wp-env run tests-cli wp user get customer 2> /dev/null

## if 0 is the exit code then we can leave otherwise we'll try creating the user
if [ $? -eq 0 ]
then
	EXIT_CODE=0
else
  npm run wp-env run tests-cli wp user create customer customer@woocommercecoree2etestsuite.com --user_pass=password --role=customer
  EXIT_CODE=$?
fi

## set permalinks for easier wp-json
npm run wp-env run tests-cli wp rewrite structure '/%postname%/'
npm run wp-env run tests-cli wp rewrite flush -- --hard
npm run wp-env run tests-cli wp plugin list
npm run wp-env run tests-cli wp option get 'siteurl'
exit $EXIT_CODE
