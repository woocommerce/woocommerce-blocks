#!/bin/bash

# Enable nicer messaging for build status.
BLUE_BOLD='\033[1;34m';
RED_BOLD='\033[1;31m';
COLOR_RESET='\033[0m';
GREEN_BOLD='\033[1;32m';
RED_BOLD='\033[1;31m';
YELLOW_BOLD='\033[1;33m';
error () {
	echo -e "${RED_BOLD}$1${COLOR_RESET}\n";
	exit 0;
}
status () {
	echo -e "${BLUE_BOLD}$1${COLOR_RESET}\n"
}
success () {
	echo -e "${GREEN_BOLD}$1${COLOR_RESET}\n"
}
warning () {
	echo -e "${YELLOW_BOLD}$1${COLOR_RESET}\n"
}

[[ -z "$1" ]] && {
	error "You must specify a branch to fix, for example: npm run fix-package-lock your/branch";
}

git fetch

if ! git checkout $1
then
	error "Unable to checkout branch";
else
	success "Checked out branch"
fi

status "Rebasing branch with trunk...";

if ! git rebase origin/trunk
then
	git rm package-lock.json
	git add .
	if ! git rebase --continue
	then
		git rebase --abort
		error "Unable to rebase branch";
	else
		success "Rebased branch with trunk"
	fi
else
	success "Rebased branch with trunk"
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
