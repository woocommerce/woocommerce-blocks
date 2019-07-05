#!/bin/bash

# Exit if any command fails.
set -e

# Change to the expected directory.
cd "$(dirname "$0")"
cd ..

# Enable nicer messaging for build status.
BLUE_BOLD='\033[1;34m';
GREEN_BOLD='\033[1;32m';
RED_BOLD='\033[1;31m';
YELLOW_BOLD='\033[1;33m';
COLOR_RESET='\033[0m';
error () {
	echo -e "\n${RED_BOLD}$1${COLOR_RESET}\n"
}
status () {
	echo -e "\n${BLUE_BOLD}$1${COLOR_RESET}\n"
}
success () {
	echo -e "\n${GREEN_BOLD}$1${COLOR_RESET}\n"
}
warning () {
	echo -e "\n${YELLOW_BOLD}$1${COLOR_RESET}\n"
}

status "💃 Time to release WooCommerce Blocks 🕺"

if [ -z "$NO_CHECKS" ]; then
	# Make sure there are no changes in the working tree. Release builds should be
	# traceable to a particular commit and reliably reproducible. (This is not
	# totally true at the moment because we download nightly vendor scripts).
	changed=
	if ! git diff --exit-code > /dev/null; then
		changed="file(s) modified"
	elif ! git diff --cached --exit-code > /dev/null; then
		changed="file(s) staged"
	fi
	if [ ! -z "$changed" ]; then
		git status
		error "ERROR: Cannot build plugin zip with dirty working tree. ☝️
		Commit your changes and try again."
		exit 1
	fi
fi

# Run the build.
status "Installing dependencies... 📦"
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install
status "==========================="
npm list webpack
status "Generating build... 👷‍♀️"
status "==========================="
npm list webpack
npm run build
status "==========================="
npm list webpack

build_files=$(ls build/*.{js,css})

# Generate the plugin zip file.
status "Creating archive... 🎁"
mkdir zip-file
mkdir zip-file/build
cp -r $build_files zip-file/build
cp -r {languages/,src/,vendor/,readme.txt,woocommerce-gutenberg-products-block.php} zip-file
cd zip-file
zip -r ../woocommerce-gutenberg-products-block.zip ./
cd ..
rm -r zip-file

success "Done. You've built WooCommerce Blocks! 🎉"
