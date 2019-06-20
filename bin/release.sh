#!/bin/sh

RELEASER_PATH=$(pwd)
PLUGIN_SLUG="woocommerce-gutenberg-products-block"
GITHUB_ORG="woocommerce"
IS_PRE_RELEASE=false

# Functions
# Check if string contains substring
is_substring() {
  case "$2" in
    *$1*)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

# Output colorized strings
#
# Color codes:
# 0 - black
# 1 - red
# 2 - green
# 3 - yellow
# 4 - blue
# 5 - magenta
# 6 - cian
# 7 - white
output() {
  echo "$(tput setaf "$1")$2$(tput sgr0)"
}

if ! [ -x "$(command -v hub)" ]; then
  echo 'Error: hub is not installed. Install from https://github.com/github/hub' >&2
  exit 1
fi

# Release script
echo
output 2 "BLOCKS RELEASE SCRIPT"
output 2 "====================="
echo
printf "This script will build files and create a tag on Github based on your local branch."
echo
echo
printf "The /build/ directory will also be pushed to the tag."
echo
echo
printf "Before proceeding, ensure you have checked out the correct branch you wish to release, and have committed/pushed all local changes."
echo
echo
output 3 "Do you want to continue? [y/N]: "
read -r PROCEED
echo

if [ "$(echo "${PROCEED:-n}" | tr "[:upper:]" "[:lower:]")" != "y" ]; then
  output 1 "Release cancelled!"
  exit 1
fi
echo
output 3 "Please enter the version number to tag, for example, 1.0.0:"
read -r VERSION
echo

# Check if is a pre-release.
if is_substring "-" "${VERSION}"; then
    IS_PRE_RELEASE=true
	output 2 "Detected pre-release version!"
fi

if [ -d "build" ]; then
	output 3 "Build directory could not be removed. Aborting."
	exit 1
fi

output 2 "Building files with NPM..."

npm install --loglevel error
npm run build --loglevel error

if [ ! -d "build" ]; then
	output 3 "Build directory not found. Aborting."
	exit 1
fi

printf "Ready to proceed? [y/N]: "
read -r PROCEED
echo

if [ "$(echo "${PROCEED:-n}" | tr "[:upper:]" "[:lower:]")" != "y" ]; then
  output 1 "Release cancelled!"
  exit 1
fi

# Ask info
output 2 "Starting release..."
echo

# Create a release branch.
BRANCH = "release/${VERSION}"
git checkout -b $BRANCH

# Force add build directory and commit.
git add build/. --force
git commit -m "Adding /build directory to release"

# Push branch upstream
git push origin $BRANCH

# Create the new release.
if [ $IS_PRE_RELEASE ]; then
	hub release create -m "Release of version $VERSION" --commitish $BRANCH --prerelease "v${VERSION}"
else
	hub release create -m "Release of version $VERSION" --commitish $BRANCH "v${VERSION}"
fi

output 2 "Github release complete."
