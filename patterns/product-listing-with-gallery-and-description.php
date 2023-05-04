<?php
/**
 * Title: Product Listing with Gallery and Description
 * Slug: woocommerce-blocks/product-listing-with-gallery-and-description
 * Categories: WooCommerce
 */

// Below query is temporary work around to get patterns previews to work.
$transient_name = 'wc_blocks_pattern_product_listing_with_gallery_and_description';
$products       = get_transient( $transient_name );
if ( ( false === $products ) || ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ) {
	global $wpdb;
	$products = $wpdb->get_results(
		"SELECT ID FROM {$wpdb->prefix}posts AS p
		WHERE p.post_type = 'product' LIMIT 1",
		ARRAY_A
	);
	set_transient( $transient_name, $products, DAY_IN_SECONDS * 14 );
}

$product_id = isset( $products[0]['ID'] ) ? $products[0]['ID'] : 0;
?>

<!-- wp:woocommerce/single-product {"productId":68,"align":"wide"} -->
<div class="wp-block-woocommerce-single-product alignwide">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:woocommerce/product-image {"showProductLink":false,"showSaleBadge":false,"isDescendentOfSingleProductBlock":true} /-->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"}}}} -->
		<div class="wp-block-column" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
			<!-- wp:post-title {"isLink":true,"style":{"typography":{"fontSize":"48px"}},"__woocommerceNamespace":"woocommerce/product-query/product-title"} /-->

			<!-- wp:woocommerce/product-rating {"isDescendentOfSingleProductBlock":true,"textColor":"luminous-vivid-amber","style":{"typography":{"fontSize":"22px"}}} /-->

			<!-- wp:woocommerce/product-price {"isDescendentOfSingleProductBlock":true,"style":{"typography":{"fontSize":"32px","fontStyle":"normal","fontWeight":"700"}}} /-->

			<!-- wp:post-excerpt {"__woocommerceNamespace":"woocommerce/product-query/product-summary"} /-->

			<!-- wp:woocommerce/add-to-cart-form /-->

			<!-- wp:woocommerce/product-meta -->
			<div class="wp-block-woocommerce-product-meta">
				<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
				<div class="wp-block-group">
					<!-- wp:woocommerce/product-sku -->
					<div class="is-loading"></div>
					<!-- /wp:woocommerce/product-sku -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:woocommerce/product-meta -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:woocommerce/single-product -->
