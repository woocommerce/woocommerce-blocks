#!/usr/bin/env bash

###################################################################################################
# Get the directory of the current script
###################################################################################################

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

###################################################################################################
# Empty site to prevent conflicts with existing data
###################################################################################################

wp-env run tests-cli "wp site empty --yes"

###################################################################################################
# If no attributes exist, otherwiese create them
###################################################################################################

attributes=$(wp-env run tests-cli "wp wc product_attribute list --format=json --user=1")

if [ -z "$attributes" ] || [ "$attributes" == "[]" ]; then
    pa_color=$(wp-env run tests-cli "wp wc product_attribute create \
        --name=Color \
        --slug=pa_color \
        --user=1 \
        --porcelain \
    ")

    pa_size=$(wp-env run tests-cli "wp wc product_attribute create \
        --name=Size \
        --slug=pa_size \
        --user=1 \
        --porcelain \
    ")
fi

###################################################################################################
# Import sample products and regenerate product lookup tables
###################################################################################################
wp-env run tests-cli "wp import wp-content/plugins/woocommerce/sample-data/sample_products.xml --authors=skip"
wp-env run tests-cli "wp wc tool run regenerate_product_lookup_tables --user=1"

###################################################################################################
# Create pages and posts
###################################################################################################

post_content=$(cat "${script_dir}/all-products.txt" | sed 's/"/\\"/g')
wp-env run tests-cli "wp post create \
	--menu_order=0 \
	--post_type=page \
	--post_status=publish \
	--post_author=1 \
	--post_title='All Products block' \
	--post_content=\"$post_content\"
"

post_content=$(cat "${script_dir}/pages/cart.html" | sed 's/"/\\"/g')
post_id=$(wp-env run tests-cli "wp post create \
	--porcelain \
	--menu_order=1 \
	--post_type=page \
	--post_status=publish \
	--post_author=1 \
	--post_title='Cart block' \
	--post_content=\"$post_content\"
")
wp-env run tests-cli "wp option update woocommerce_cart_page_id $post_id"

post_content=$(cat "${script_dir}/pages/checkout.html" | sed 's/"/\\"/g')
post_id=$(wp-env run tests-cli "wp post create \
	--porcelain \
	--menu_order=2 \
	--post_type=page \
	--post_status=publish \
	--post_author=1 \
	--post_title='Checkout block' \
	--post_content=\"$post_content\"
")
wp-env run tests-cli "wp option update woocommerce_checkout_page_id $post_id"

post_content=$(cat "${script_dir}/pages/my-account.html" | sed 's/"/\\"/g')
post_id=$(wp-env run tests-cli "wp post create \
	--porcelain \
	--menu_order=3 \
	--post_type=page \
	--post_status=publish \
	--post_author=1 \
	--post_title='My Account' \
	--post_content=\"$post_content\"
")
wp-env run tests-cli "wp option update woocommerce_myaccount_page_id $post_id"

post_id=$(wp-env run tests-cli "wp post create \
	--porcelain \
	--menu_order=4 \
	--post_type=page \
	--post_status=publish \
	--post_author=1 \
	--post_title='Terms'")
wp-env run tests-cli "wp option update woocommerce_terms_page_id $post_id"

post_id=$(wp-env run tests-cli "wp post create \
	--porcelain \
	--menu_order=5 \
	--post_type=page \
	--post_status=publish \
	--post_author=1 \
	--post_title='Privacy'
")
wp-env run tests-cli "wp option update wp_page_for_privacy_policy $post_id"


find $script_dir/posts/ -maxdepth 1 -type f -print0 | while read -d $'\0' file; do
	name=$(basename -s .html $file)
	title=$(echo $name | tr "-" " ")
	# bash 4.0+ only. Leaving it here to use when we run this script inside the
	# container.
	# title=$(IFS=- read -ra str <<<"$name"; printf '%s' "${str[*]^}")
	post_content=$(cat "${file}" | sed 's/"/\\"/g')
	wp-env run tests-cli "wp post create \
		--post_status=publish \
		--post_author=1 \
		--post_title='${title}' \
		--post_content=\"$post_content\"
	"
done

###################################################################################################
# Set up shipping
###################################################################################################

wp-env run tests-cli "wp wc shipping_zone_method create 0 \
	--order=1 \
	--enabled=true \
	--user=1 \
	--settings='{\"title\":\"Flat rate shipping\", \"cost\": \"10\"}' \
	--method_id=flat_rate
"

wp-env run tests-cli "wp wc shipping_zone_method create 0 \
	--order=2 \
	--enabled=true \
	--user=1 \
	--settings='{\"title\":\"Free shipping\"}' \
	--method_id=free_shipping
"

###################################################################################################
# Set up payment methods
###################################################################################################

wp-env run tests-cli "wp option set --format=json woocommerce_cod_settings '{
    \"enabled\":\"yes\",
    \"title\":\"Cash on delivery\",
    \"description\":\"Cash on delivery description\",
    \"instructions\":\"Cash on delivery instructions\"
}'"

wp-env run tests-cli "wp option set --format=json woocommerce_bacs_settings '{
    \"enabled\":\"yes\",
    \"title\":\"Direct bank transfer\",
    \"description\":\"Direct bank transfer description\",
    \"instructions\":\"Direct bank transfer instructions\"
}'"

wp-env run tests-cli "wp option set --format=json woocommerce_cheque_settings '{
    \"enabled\":\"yes\",
    \"title\":\"Check payments\",
    \"description\":\"Check payments description\",
    \"instructions\":\"Check payments instructions\"
}'"

###################################################################################################
# Set up tax
###################################################################################################

wp-env run tests-cli "wp option set woocommerce_calc_taxes yes"

wp-env run tests-cli "wp wc tax create \
    --user=1 \
    --rate=20 \
    --class=standard \
"

wp-env run tests-cli "wp wc tax create \
    --user=1 \
    --rate=10 \
    --class=reduced-rate \
"

wp-env run tests-cli "wp wc tax create \
    --user=1 \
    --rate=0 \
    --class=zero-rate \
"

###################################################################################################
# Adjust and flush rewrite rules
###################################################################################################
# Currently, the rewrite rules don't work properly in the test environment: https://github.com/WordPress/gutenberg/issues/28201
wp-env run tests-wordpress "chmod -c ugo+w /var/www/html"
wp-env run tests-cli "wp rewrite structure /%postname%/ --hard"
wp-env run tests-cli "wp rewrite flush --hard"

###################################################################################################
# Create a customer
###################################################################################################

wp-env run tests-cli "wp user create customer customer@woocommerceblockse2etestsuite.com \
	--user_pass=password \
	--role=subscriber \
	--first_name='Jane' \
	--last_name='Smith' \
	--path=/var/www/html \
	--user_registered='2022-01-01 12:23:45'
"

###################################################################################################
# Update blog name
###################################################################################################

wp-env run tests-cli "wp option update blogname 'WooCommerce Blocks E2E Test Suite'"
