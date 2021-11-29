#!/bin/sh

# When it is set to True, the commands are just printed but not executed.
DRY_RUN_MODE=False

# When it is set to True, the commands that affect the local env are executed (e.g. git commit), while the commands that affect the remote env are not executed but just printed (e.g. git push)
SIMULATE_RELEASE_MODE=False


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


simulate() {
  if $2 ; then
	eval "$1"
  else
	output 3 "DRY RUN: $1"
  fi
}


run_command() {
  if $DRY_RUN_MODE; then
	output 3 "DRY RUN: $1"
  elif $SIMULATE_RELEASE_MODE; then
		simulate "$1" $2
  else
	eval "$1"
  fi
}


run_command "rimraf ./storybook/dist/*" True
run_command "npm run storybook:build" True
run_command "gh-pages -d ./storybook/dist" False
