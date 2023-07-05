<?php
/**
 * Title: Featured Products 5-Item Grid
 * Slug: woocommerce-blocks/featured-products-5-item-grid
 * Categories: WooCommerce
 * Block Types: core/query/woocommerce/product-query
 */
?>
<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontStyle":"normal","fontWeight":"800"},"spacing":{"margin":{"bottom":"var:preset|spacing|40"}}},"fontSize":"x-large"} -->
<h2 class="wp-block-heading has-text-align-center has-x-large-font-size" style="margin-bottom:var(--wp--preset--spacing--40);font-style:normal;font-weight:800">
	Shop new arrivals
</h2>
<!-- /wp:heading -->

<!-- wp:group {"align":"wide","layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group alignwide">
	<!-- wp:query {"query":{"perPage":"5","pages":0,"offset":0,"postType":"product","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"__woocommerceAttributes":[],"__woocommerceStockStatus":["instock","onbackorder"]},"displayLayout":{"type":"flex","columns":5},"namespace":"woocommerce/product-query"} -->
	<div class="wp-block-query">
		<!-- wp:post-template {"__woocommerceNamespace":"woocommerce/product-query/product-template"} -->

		<!-- wp:group -->
		<div class="wp-block-group has-contrast-color has-text-color" style="">
			<!-- wp:woocommerce/product-image {"imageSizing":"thumbnail","isDescendentOfQueryLoop":true} /-->
			<!-- wp:post-title {"level":3,"isLink":true,"style":{"spacing":{"margin":{"top":"0","right":"0","bottom":"0rem"}},"typography":{"fontStyle":"normal","fontWeight":"700"}},"fontSize":"small","__woocommerceNamespace":"woocommerce/product-query/product-title"} /-->
			<!-- wp:woocommerce/product-price {"isDescendentOfQueryLoop":true,"textAlign":"left","fontSize":"small","style":{"spacing":{"margin":{"bottom":"0","top":"var:preset|spacing|20"}}}} /-->
		</div>
		<!-- /wp:group -->

		<!-- /wp:post-template -->

		<!-- wp:paragraph {"placeholder":"Add text or blocks that will display when a query returns no results."} -->
		<p></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:query -->
</div>
<!-- /wp:group -->

<!-- wp:buttons {"align":"wide","layout":{"type":"flex","verticalAlignment":"center","justifyContent":"center"}} -->
<div class="wp-block-buttons alignwide">
	<!-- wp:button {"textAlign":"center"} -->
	<div class="wp-block-button">
		<a class="wp-block-button__link has-text-align-center wp-element-button" href="<?php echo esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ); ?>">
			Shop All
		</a>
	</div>
	<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
