<?php
/**
 * Title: WooCommerce Featured Products 5-item grid
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

<!-- wp:query {"queryId":2,"query":{"perPage":"5","pages":0,"offset":0,"postType":"product","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"__woocommerceAttributes":[],"__woocommerceStockStatus":["instock","onbackorder"]},"displayLayout":{"type":"flex","columns":5},"namespace":"woocommerce/product-query","align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-query alignwide">
	<!-- wp:post-template {"__woocommerceNamespace":"woocommerce/product-query/product-template"} -->
	<!-- wp:woocommerce/product-image {"isDescendentOfQueryLoop":true,"imageSizing":"thumbnail","style":{"spacing":{"margin":{"bottom":"0.75rem","top":"0"}}}} /-->

	<!-- wp:columns {"isStackedOnMobile":false} -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:post-title {"level":3,"isLink":true,"style":{"spacing":{"margin":{"bottom":"0.75rem","top":"0"}}},"fontSize":"small","__woocommerceNamespace":"woocommerce/product-query/product-title"} /-->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:woocommerce/product-price {"isDescendentOfQueryLoop":true,"textAlign":"right","fontSize":"small","style":{"spacing":{"margin":{"bottom":"0","top":"0"}}}} /-->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
	<!-- /wp:post-template -->

	<!-- wp:paragraph {"placeholder":"Add text or blocks that will display when a query returns no results."} -->
	<p></p>
	<!-- /wp:paragraph -->
</div>
<!-- /wp:query -->

<!-- wp:buttons {"align":"wide","layout":{"type":"flex","verticalAlignment":"center","justifyContent":"center"}} -->
<div class="wp-block-buttons alignwide">
	<!-- wp:button {"textAlign":"center"} -->
	<div class="wp-block-button"><a class="wp-block-button__link has-text-align-center wp-element-button" href="/shop">Shop All</a></div>
	<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
