#!/bin/bash
export STARTTAG="<!-- FEEDBACK -->"
export ENDTAG="<!-- /FEEDBACK -->"

function update_footer {
	export REPLACEWITH='<br/><br/><p align="center"><a href="https://woocommerce.com/"><img src="https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce@2x.png" alt="WooCommerce" height="28px" style="filter: grayscale(100%);opacity: 0.2;" /></a></p><p align="center"><a href="https://woocommerce.com/careers/">We'\''re hiring</a>! Come work with us!</p><p align="center">🐞 Found a mistake, or have a suggestion? <a href="https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20`'$1'`">Leave feedback about this document here.</a></p>'
	if grep -q "$STARTTAG" "$1"; then
		perl -i -pe 's/$ENV{STARTTAG}.*$ENV{ENDTAG}/$ENV{STARTTAG}$ENV{REPLACEWITH}$ENV{ENDTAG}/' $1
	else
		printf '%s\n' '' "${STARTTAG}${REPLACEWITH}${ENDTAG}" '' >> $1
	fi
}

find ./docs -name "*.md"|while read filename; do
  update_footer $filename
done

find ./packages/checkout -name "*.md"|while read filename; do
  update_footer $filename
done

find ./src/StoreApi -name "*.md"|while read filename; do
  update_footer $filename
done
