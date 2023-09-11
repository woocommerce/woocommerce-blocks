#!/usr/bin/env bash

###################################################################################################
# Import sample products and regenerate product lookup tables
###################################################################################################
wp import wp-content/plugins/woocommerce/sample-data/sample_products.xml --authors=skip
wp wc tool run regenerate_product_lookup_tables --user=1
# Currently, sometimes the thumbnails aren't visible after importing products via xml. We have to regenerate them. https://github.com/woocommerce/woocommerce/issues/31646.
wp media regenerate --yes

