<?php
/**
 * Title: Product Hero | Wide
 * Slug: woocommerce-blocks/product-hero-wide
 * Categories: WooCommerce
 */
?>
<!-- wp:group {"align":"wide","style":{"color":{"background":"#6b7ba8"},"spacing":{"blockGap":"0","padding":{"top":"var:preset|spacing|40","right":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40"}}},"textColor":"background","layout":{"type":"constrained","contentSize":"100%","justifyContent":"left"}} -->
<div class="wp-block-group alignwide has-background-color has-text-color has-background" style="background-color:#6b7ba8;padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40)"><!-- wp:woocommerce/single-product {"productId":} -->
	<div class="wp-block-woocommerce-single-product"><!-- wp:columns -->
		<div class="wp-block-columns"><!-- wp:column -->
			<div class="wp-block-column"><!-- wp:woocommerce/product-image {"showSaleBadge":false,"isDescendentOfSingleProductBlock":true} /--></div>
			<!-- /wp:column -->

			<!-- wp:column -->
			<div class="wp-block-column"><!-- wp:post-title {"isLink":true,"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"spacing":{"margin":{"bottom":"var:preset|spacing|20"}}},"textColor":"background","fontSize":"x-large","__woocommerceNamespace":"woocommerce/product-query/product-title"} /-->

			<!-- wp:woocommerce/product-price {"isDescendentOfSingleProductBlock":true,"style":{"spacing":{"margin":{"top":"0"}},"typography":{"fontStyle":"normal","fontWeight":"700"}}} /-->

			<!-- wp:woocommerce/add-to-cart-form /-->

			<!-- wp:post-excerpt {"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","__woocommerceNamespace":"woocommerce/product-query/product-summary"} /--></div>
			<!-- /wp:column --></div>
		<!-- /wp:columns --></div>
	<!-- /wp:woocommerce/single-product --></div>
<!-- /wp:group -->
