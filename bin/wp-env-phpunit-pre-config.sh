#!/bin/sh
BASENAME=$(basename "`pwd`")
WOO_DIR=$(PWD)
WOO_DIR="$WOO_DIR/bin/woocommerce"
echo $WOO_DIR
# Clone Woo Core so tests helpers are available (the `tests` dir is mapped in
# the `.wp-env.json` file)
# TODO: This is always bringing in the latest test helpers, eventually we'll
#       need to bring in the helpers for the version of Woo being tested.
# TODO: Local installs won't refresh this automatically. For now I wanted to
#       avoid excessive unnecessary cloning, but we probably should have this
#       refreshed somehow (maybe based on age of directory?).
if [ ! -d $WOO_DIR ]; then
	git clone --depth 1 "https://github.com/woocommerce/woocommerce.git" "$WOO_DIR"
fi
npm run wp-env run phpunit 'php -v'
npm run wp-env run phpunit 'phpunit -c /var/www/html/wp-content/plugins/'$BASENAME'/phpunit.xml.dist --verbose'
