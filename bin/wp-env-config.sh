#!/bin/bash

## Check if user already exists
wp user get customer 2> /dev/null

## if 0 is the exit code then we can leave otherwise we'll try creating the user
if [ $? -eq 0 ]
then
	EXIT_CODE=0
else
  wp user create customer customer@woocommercecoree2etestsuite.com --user_pass=password --role=customer
  EXIT_CODE=$?
fi

# PERMALINK SETTINGS ###########################################################
wp rewrite structure '/%postname%/'
wp rewrite flush

# PLUGIN SETTINGS ##############################################################
wp plugin install woo-gutenberg-products-block

# THEME SETTINGS ################################################################
wp theme activate storefront

# LANGUAGE SETTINGS ############################################################
wp language core install de_DE
wp language plugin install --all de_DE
wp language theme install --all de_DE

# PRODUCT SETTINGS #############################################################
wp import wp-content/plugins/woocommerce/sample-data/sample_products.xml --authors=skip

# PAGE SETTINGS ################################################################
wp post create --post_author=1 --post_type=page --post_status=publish --post_title='Cart block' --post_name='cart-block' --post_content='<!-- wp:woocommerce/cart --><div class="wp-block-woocommerce-cart is-loading"><!-- wp:woocommerce/filled-cart-block --><div class="wp-block-woocommerce-filled-cart-block"><!-- wp:woocommerce/cart-items-block --><div class="wp-block-woocommerce-cart-items-block"><!-- wp:woocommerce/cart-line-items-block --><div class="wp-block-woocommerce-cart-line-items-block"></div><!-- /wp:woocommerce/cart-line-items-block --></div><!-- /wp:woocommerce/cart-items-block --><!-- wp:woocommerce/cart-totals-block --><div class="wp-block-woocommerce-cart-totals-block"><!-- wp:woocommerce/cart-order-summary-block --><div class="wp-block-woocommerce-cart-order-summary-block"></div><!-- /wp:woocommerce/cart-order-summary-block --><!-- wp:woocommerce/cart-express-payment-block --><div class="wp-block-woocommerce-cart-express-payment-block"></div><!-- /wp:woocommerce/cart-express-payment-block --><!-- wp:woocommerce/proceed-to-checkout-block --><div class="wp-block-woocommerce-proceed-to-checkout-block"></div><!-- /wp:woocommerce/proceed-to-checkout-block --><!-- wp:woocommerce/cart-accepted-payment-methods-block --><div class="wp-block-woocommerce-cart-accepted-payment-methods-block"></div><!-- /wp:woocommerce/cart-accepted-payment-methods-block --></div><!-- /wp:woocommerce/cart-totals-block --></div><!-- /wp:woocommerce/filled-cart-block --><!-- wp:woocommerce/empty-cart-block --><div class="wp-block-woocommerce-empty-cart-block"><!-- wp:image {"align":"center","sizeSlug":"small"} --><div class="wp-block-image"><figure class="aligncenter size-small"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDBDOC41MDQwMyAwIDAgOC41MDQwMyAwIDE5QzAgMjkuNDk2IDguNTA0MDMgMzggMTkgMzhDMjkuNDk2IDM4IDM4IDI5LjQ5NiAzOCAxOUMzOCA4LjUwNDAzIDI5LjQ5NiAwIDE5IDBaTTI1LjEyOSAxMi44NzFDMjYuNDg1MSAxMi44NzEgMjcuNTgwNiAxMy45NjY1IDI3LjU4MDYgMTUuMzIyNkMyNy41ODA2IDE2LjY3ODYgMjYuNDg1MSAxNy43NzQyIDI1LjEyOSAxNy43NzQyQzIzLjc3MyAxNy43NzQyIDIyLjY3NzQgMTYuNjc4NiAyMi42Nzc0IDE1LjMyMjZDMjIuNjc3NCAxMy45NjY1IDIzLjc3MyAxMi44NzEgMjUuMTI5IDEyLjg3MVpNMTEuNjQ1MiAzMS4yNTgxQzkuNjE0OTIgMzEuMjU4MSA3Ljk2Nzc0IDI5LjY0OTIgNy45Njc3NCAyNy42NTczQzcuOTY3NzQgMjYuMTI1IDEwLjE1MTIgMjMuMDI5OCAxMS4xNTQ4IDIxLjY5NjhDMTEuNCAyMS4zNjczIDExLjg5MDMgMjEuMzY3MyAxMi4xMzU1IDIxLjY5NjhDMTMuMTM5MSAyMy4wMjk4IDE1LjMyMjYgMjYuMTI1IDE1LjMyMjYgMjcuNjU3M0MxNS4zMjI2IDI5LjY0OTIgMTMuNjc1NCAzMS4yNTgxIDExLjY0NTIgMzEuMjU4MVpNMTIuODcxIDE3Ljc3NDJDMTEuNTE0OSAxNy43NzQyIDEwLjQxOTQgMTYuNjc4NiAxMC40MTk0IDE1LjMyMjZDMTAuNDE5NCAxMy45NjY1IDExLjUxNDkgMTIuODcxIDEyLjg3MSAxMi44NzFDMTQuMjI3IDEyLjg3MSAxNS4zMjI2IDEzLjk2NjUgMTUuMzIyNiAxNS4zMjI2QzE1LjMyMjYgMTYuNjc4NiAxNC4yMjcgMTcuNzc0MiAxMi44NzEgMTcuNzc0MlpNMjUuOTEwNSAyOS41ODc5QzI0LjE5NDQgMjcuNTM0NyAyMS42NzM4IDI2LjM1NDggMTkgMjYuMzU0OEMxNy4zNzU4IDI2LjM1NDggMTcuMzc1OCAyMy45MDMyIDE5IDIzLjkwMzJDMjIuNDAxNiAyMy45MDMyIDI1LjYxMTcgMjUuNDA0OCAyNy43ODc1IDI4LjAyNUMyOC44NDQ4IDI5LjI4MTUgMjYuOTI5NCAzMC44MjE0IDI1LjkxMDUgMjkuNTg3OVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=" alt=""/></figure></div><!-- /wp:image --><!-- wp:heading {"textAlign":"center","className":"wc-block-cart__empty-cart__title"} --><h2 class="has-text-align-center wc-block-cart__empty-cart__title" id="your-cart-is-currently-empty">Your cart is currently empty!</h2><!-- /wp:heading --><!-- wp:paragraph {"align":"center"} --><p class="has-text-align-center"><a href="http://localhost:8889/shop/">Browse store</a>.</p><!-- /wp:paragraph --><!-- wp:separator {"className":"is-style-dots"} --><hr class="wp-block-separator is-style-dots"/><!-- /wp:separator --><!-- wp:heading {"textAlign":"center"} --><h2 class="has-text-align-center" id="new-in-store">New in store</h2><!-- /wp:heading --><!-- wp:woocommerce/product-new {"rows":1} /--></div><!-- /wp:woocommerce/empty-cart-block --></div><!-- /wp:woocommerce/cart -->'
wp post create --post_author=1 --post_type=page --post_status=publish --post_title='Checkout block' --post_name='checkout-block' --post_content='<!-- wp:woocommerce/checkout --><div class="wp-block-woocommerce-checkout wc-block-checkout is-loading"><!-- wp:woocommerce/checkout-fields-block --><div class="wp-block-woocommerce-checkout-fields-block"><!-- wp:woocommerce/checkout-express-payment-block --><div class="wp-block-woocommerce-checkout-express-payment-block"></div><!-- /wp:woocommerce/checkout-express-payment-block --><!-- wp:woocommerce/checkout-contact-information-block --><div class="wp-block-woocommerce-checkout-contact-information-block"></div><!-- /wp:woocommerce/checkout-contact-information-block --><!-- wp:woocommerce/checkout-shipping-address-block --><div class="wp-block-woocommerce-checkout-shipping-address-block"></div><!-- /wp:woocommerce/checkout-shipping-address-block --><!-- wp:woocommerce/checkout-billing-address-block --><div class="wp-block-woocommerce-checkout-billing-address-block"></div><!-- /wp:woocommerce/checkout-billing-address-block --><!-- wp:woocommerce/checkout-shipping-methods-block --><div class="wp-block-woocommerce-checkout-shipping-methods-block"></div><!-- /wp:woocommerce/checkout-shipping-methods-block --><!-- wp:woocommerce/checkout-payment-block --><div class="wp-block-woocommerce-checkout-payment-block"></div><!-- /wp:woocommerce/checkout-payment-block --><!-- wp:woocommerce/checkout-order-note-block --><div class="wp-block-woocommerce-checkout-order-note-block"></div><!-- /wp:woocommerce/checkout-order-note-block --><!-- wp:woocommerce/checkout-terms-block --><div class="wp-block-woocommerce-checkout-terms-block"></div><!-- /wp:woocommerce/checkout-terms-block --><!-- wp:woocommerce/checkout-actions-block --><div class="wp-block-woocommerce-checkout-actions-block"></div><!-- /wp:woocommerce/checkout-actions-block --></div><!-- /wp:woocommerce/checkout-fields-block --><!-- wp:woocommerce/checkout-totals-block --><div class="wp-block-woocommerce-checkout-totals-block"><!-- wp:woocommerce/checkout-order-summary-block --><div class="wp-block-woocommerce-checkout-order-summary-block"></div><!-- /wp:woocommerce/checkout-order-summary-block --></div><!-- /wp:woocommerce/checkout-totals-block --></div><!-- /wp:woocommerce/checkout -->'
wp post create --post_author=1 --post_type=page --post_status=publish --post_title='Terms & Conditions' --post_name='terms-conditions'
wp post update $(wp post list --title="Privacy Policy" --post_type=page --field=ID) --post_status=publish

# OPTION SETTINGS ##############################################################
wp option update woocommerce_terms_page_id $(wp post list --title="Terms & Conditions" --post_type=page --field=ID)

# PAYMENT SETTINGS ##############################################################
wp wc payment_gateway update cod --enabled=1 --user=1
wp wc payment_gateway update bacs --enabled=1 --user=1
wp wc payment_gateway update cheque --enabled=1 --user=1

# SHIPPING SETTINGS #############################################################
wp wc shipping_zone_method create 0 --order=0 --enabled=true --settings='{"title":"Express rate", "cost": "20"}' --method_id=flat_rate --user=1
wp wc shipping_zone_method create 0 --order=1 --enabled=true --settings='{"title":"Standard rate", "cost": "10"}' --method_id=flat_rate --user=1
wp wc shipping_zone_method create 0 --order=2 --enabled=true --settings='{"title":"Free Shipping"}' --method_id=free_shipping --user=1

# COUPON SETTINGS ###############################################################
wp wc shop_coupon create --code=single --amount=10 --discount_type=percent --usage_limit=1 --user=1

# DISPLAY CORE, PLUGIN & THEME SETTINGS ########################################
wp core version --extra
wp plugin list
wp theme list

################################################################################

exit $EXIT_CODE
