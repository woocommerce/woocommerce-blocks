#!/bin/bash

RED_BOLD='\033[1;31m';
COLOR_RESET='\033[0m';
GREEN_BOLD='\033[1;32m';
RED_BOLD='\033[1;31m';
YELLOW_BOLD='\033[1;33m';
error () {
	echo "\n${RED_BOLD}$1${COLOR_RESET}\n";
	exit 0;
}
status () {
	echo "\n${BLUE_BOLD}$1${COLOR_RESET}\n"
}
success () {
	echo "\n${GREEN_BOLD}$1${COLOR_RESET}\n"
}
warning () {
	echo "\n${YELLOW_BOLD}$1${COLOR_RESET}\n"
}

[[ -z "$1" ]] && {
	error "You must specify a branch to fix, for example: npm run fix-package-lock your/branch";
}

status "Updating trunk...";
git checkout trunk
git pull

if git checkout $1
then
	error "Unable to checkout branch $i";
else
	success "Checked out branch $i"
fi

status "Rebasing branch with trunk...";
git pull

if git rebase -Xours trunk
then
	error "Unable to rebase branch $i";
else
	success "Rebased branch $i with trunk"
fi

status "Removing package-lock.json...";
rm package-lock.json

status "Installing dependencies...";
npm install

status "Comitting updated package-lock.json...";
git add package-lock.json
git commit -m 'update package-lock.json'
git push -f

success "Done. Package Lock has been updated. 🎉"
