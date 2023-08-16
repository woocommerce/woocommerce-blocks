#!/usr/bin/env bash

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Empty the site to remove unused pages and posts created by WP and Woo.
wp site empty --yes

# Run all scripts in parallel at maximum 10 at a time
find $script_dir/*.sh -maxdepth 1 -type f ! -name "index.sh" ! -name "rewrite.sh" | xargs -P10 -n1 bash

# Run rewrite script last to ensure all posts are created before running it
bash $script_dir/rewrite.sh
