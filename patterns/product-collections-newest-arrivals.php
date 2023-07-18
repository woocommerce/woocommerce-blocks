<?php
/**
 * Title: Product Collections Newest Arrivals
 * Slug: woocommerce-blocks/product-collections-newest-arrivals
 * Categories: WooCommerce
 * Block Types: core/query/woocommerce/product-query
 */
?>

<!-- wp:group {"align":"wide","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide">
	<!-- wp:group {"align":"wide","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
	<div class="wp-block-group alignwide">
		<!-- wp:heading {"level":3} -->
		<h3 class="wp-block-heading">Our newest arrivals</h3>
		<!-- /wp:heading -->

		<!-- wp:buttons -->
		<div class="wp-block-buttons">
			<!-- wp:button -->
			<div class="wp-block-button">
				<a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ); ?>">More new products</a>
			</div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"align":"wide","layout":{"type":"flex","flexWrap":"nowrap"}} -->
	<div class="wp-block-group alignwide">
		<!-- wp:query {"queryId":9,"query":{"perPage":"4","pages":0,"offset":0,"postType":"product","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"__woocommerceAttributes":[],"__woocommerceStockStatus":["instock","onbackorder"]},"displayLayout":{"type":"flex","columns":4},"namespace":"woocommerce/product-query"} -->
		<div class="wp-block-query">
			<!-- wp:post-template {"className":"products-block-post-template","__woocommerceNamespace":"woocommerce/product-query/product-template"} -->
			<!-- wp:woocommerce/product-image {"imageSizing":"thumbnail","isDescendentOfQueryLoop":true,"style":{"spacing":{"padding":{"top":"var:preset|spacing|20","right":"var:preset|spacing|20","bottom":"var:preset|spacing|20","left":"var:preset|spacing|20"}}}} /-->
			<!-- wp:post-title {"textAlign":"center","level":3,"isLink":true,"style":{"spacing":{"margin":{"bottom":"0.75rem","top":"0"}}},"fontSize":"medium","__woocommerceNamespace":"woocommerce/product-query/product-title"} /-->
			<!-- /wp:post-template -->
		</div>
		<!-- /wp:query -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
