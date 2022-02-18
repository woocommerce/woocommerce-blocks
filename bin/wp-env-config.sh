#!/bin/bash

## Check if user already exists
wp user get customer 2> /dev/null

## if 0 is the exit code then we can leave otherwise we'll try creating the user
if [ $? -eq 0 ]
then
	EXIT_CODE=0
else
  wp user create customer customer@woocommercecoree2etestsuite.com --user_pass=password --role=customer
  EXIT_CODE=$?
fi

## set permalinks for easier wp-json
wp rewrite structure '/%postname%/'
wp rewrite flush
wp core version --extra
wp plugin list
wp theme activate storefront
wp plugin is-installed Basic-Auth
if [ $? -eq 1 ]
then
  wp plugin install https://github.com/WP-API/Basic-Auth/archive/master.zip --activate
else 
  wp plugin activate Basic-Auth
fi

exit $EXIT_CODE
