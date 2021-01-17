#!/bin/sh
BASENAME=$(basename "`pwd`")
TMPDIR=${TMPDIR-/tmp}
WOO_DIR="./bin/woocommerce"
# Grab Woo test helpers and move into directory (only if needed)
# TODO: This is always bringing in the latest test helpers, eventually we'll
#       need to bring in the helpers for the version of Woo being tested.
if [ ! -d '${WOO_DIR}/tests' ]; then
	git clone --depth 1 "https://github.com/woocommerce/woocommerce.git" "$TMPDIR/woocommerce-git"
	mv "$TMPDIR/woocommerce-git/tests" "$WOO_DIR"
	## cleanup
	rm -rf "$TMPDIR/woocommerce-git"
fi
npm run wp-env run phpunit 'php -v'
npm run wp-env run phpunit 'phpunit -c /var/www/html/wp-content/plugins/'$BASENAME'/phpunit.xml.dist --verbose'
