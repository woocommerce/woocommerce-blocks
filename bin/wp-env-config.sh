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
wp wc customer update 1 --user=1 --billing='{"first_name":"John","last_name":"Doe","company":"Automattic","country":"US","address_1":"addr 1","address_2":"addr 2","city":"San Francisco","state":"CA","postcode":"94107","phone":"123456789"}' --shipping='{"first_name":"John","last_name":"Doe","company":"Automattic","country":"US","address_1":"addr 1","address_2":"addr 2","city":"San Francisco","state":"CA","postcode":"94107","phone":"123456789"}'

## Prepare translation for the test suite
wp language core install nl_NL
wp language plugin install woocommerce nl_NL
wp language plugin install woo-gutenberg-products-block nl_NL
# Because we don't install the WooCommerce Blocks plugin, WP CLI uses the core version to install the language pack.
# To get the latest translations, we need to run an additional update command.
#wp language plugin update woo-gutenberg-products-block nl_NL
## downloaded unpurged translation file
curl https://translate.wordpress.org/projects/wp-plugins/woo-gutenberg-products-block/stable/nl/default/export-translations/ --output ./wp-content/languages/plugins/woo-gutenberg-products-block-nl_NL.po
sleep 30
## update po file with new locations
php -d memory_limit=2024M "$(which wp)" i18n make-pot ./wp-content/plugins/$BASENAME/ ./wp-content/languages/plugins/woo-gutenberg-products-block-nl_NL.po --domain=woo-gutenberg-products-block --exclude=node_modules,vendor
sleep 30
## regenerate json files
php -d memory_limit=2024M "$(which wp)" i18n make-json ./wp-content/languages/plugins/woo-gutenberg-products-block-nl_NL.po
exit $EXIT_CODE
