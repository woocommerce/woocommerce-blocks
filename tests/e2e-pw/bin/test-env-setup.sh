#!/bin/sh
wp-env run tests-cli "wp db reset --yes"
wp-env run tests-cli "wp db import woocommerce.sql"
wp-env run tests-wordpress "chmod -c ugo+w /var/www/html"
wp-env run tests-cli "wp rewrite structure /%postname%/ --hard"
wp-env run tests-cli "wp rewrite flush --hard"
wp-env run tests-cli "wp wc tool run regenerate_product_lookup_tables --user=1"
wp-env run tests-cli "wp plugin activate woocommerce-gutenberg-products-block"
wp-env run tests-cli "wp option update blogname 'WooCommerce Blocks E2E Test Suite'"
