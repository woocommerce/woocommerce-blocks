cd "$1" || exit
rsync ./ "$2"/ --recursive --delete --delete-excluded \
	--exclude=".*/" \
	--exclude="*.md" \
	--exclude=".*" \
	--exclude="composer.*" \
	--exclude="*.lock" \
	--exclude=bin/ \
	--exclude=node_modules/ \
	--exclude=tests/ \
	--exclude=docs/ \
	--exclude=phpcs.xml \
	--exclude=phpunit.xml.dist \
	--exclude=CODEOWNERS \
	--exclude=renovate.json \
	--exclude="*.config.js" \
	--exclude="*-config.js" \
	--exclude="*.config.json" \
	--exclude=package.json \
	--exclude=package-lock.json \
	--exclude=none \
	--exclude=blocks.ini \
	--exclude=docker-compose.yml \
	--exclude=tsconfig.json \
	--exclude=woocommerce-gutenberg-products-block.zip \
	--exclude="zip-file/" \
	--exclude=globals.d.ts
echo -e "\nDone copying files!\n"
