<?php
/**
 * Title: Product collections: Newest Arrivals
 * Slug: woocommerce-blocks/product-collections-newest-arrivals
 * Categories: WooCommerce
 * Block Types: core/query/woocommerce/product-query
 */
?>

<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull">
	<!-- wp:group {"align":"full","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
	<div class="wp-block-group alignfull">
		<!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"48px"}}} -->
		<h1 class="wp-block-heading" style="font-size:48px">Our newest arrivals</h1>
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

	<!-- wp:group {"align":"full","layout":{"type":"flex","flexWrap":"nowrap"}} -->
	<div class="wp-block-group alignfull">
		<!-- wp:query {"queryId":1,"query":{"perPage":"4","pages":0,"offset":0,"postType":"product","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"__woocommerceAttributes":[],"__woocommerceStockStatus":["instock","onbackorder"]},"displayLayout":{"type":"flex","columns":4},"namespace":"woocommerce/product-query"} -->
		<div class="wp-block-query">
			<!-- wp:post-template {"__woocommerceNamespace":"woocommerce/product-query/product-template"} -->

				<!-- wp:group {"style":{"border":{"radius":"4px","top":{"color":"#dddddd","style":"solid","width":"1px"},"right":{"color":"#dddddd","style":"solid","width":"1px"},"bottom":{"color":"#dddddd","style":"solid","width":"1px"},"left":{"color":"#dddddd","style":"solid","width":"1px"}},"spacing":{"padding":{"top":"var:preset|spacing|50","right":"var:preset|spacing|40","bottom":"var:preset|spacing|20","left":"var:preset|spacing|40"}}},"layout":{"type":"flex","orientation":"vertical","verticalAlignment":"center","justifyContent":"center"}} -->
				<div class="wp-block-group" style="border-radius:4px;border-top-color:#dddddd;border-top-style:solid;border-top-width:1px;border-right-color:#dddddd;border-right-style:solid;border-right-width:1px;border-bottom-color:#dddddd;border-bottom-style:solid;border-bottom-width:1px;border-left-color:#dddddd;border-left-style:solid;border-left-width:1px;padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--40)">
					<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"1","scale":"contain","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"}}}} /-->
					<!-- wp:post-title {"level":3,"isLink":true,"style":{"spacing":{"margin":{"bottom":"0.75rem","top":"0"}},"typography":{"fontStyle":"normal","fontWeight":"300","textDecoration":"underline"}},"fontSize":"small","__woocommerceNamespace":"woocommerce/product-query/product-title"} /-->
				</div>
				<!-- /wp:group -->

			<!-- /wp:post-template -->
		</div>
		<!-- /wp:query -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
