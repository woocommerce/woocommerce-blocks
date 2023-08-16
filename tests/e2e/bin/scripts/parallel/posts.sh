#!/usr/bin/env bash

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../../posts/ && pwd)"

find $script_dir -maxdepth 1 -type f -print0 | while read -d $'\0' file; do
	name=$(basename -s .html $file) # Remove .html extension
	title=$(IFS=- read -ra str <<<"$name"; printf '%s' "${str[*]^}") # Capitalize each word
	wp post create \
		--post_status=publish \
		--post_author=1 \
		--post_title="$title block" \
		$file
done
