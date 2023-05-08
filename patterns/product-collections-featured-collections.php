<?php
/**
 * Title: Product Collections: Featured Collections
 * Slug: woocommerce-blocks/product-collections-featured-collections
 * Categories: WooCommerce
 */
?>

<!-- wp:columns {"align":"wide","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":{"top":"0","left":"0"}}}} -->
<div class="wp-block-columns alignwide" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
	<!-- wp:column {"width":"50%","style":{"spacing":{"padding":{"top":"30px","right":"30px","bottom":"30px","left":"30px"}},"color":{"background":"#f3edd8"}},"layout":{"type":"constrained"}} -->
	<div class="wp-block-column has-background" style="background-color:#f3edd8;padding-top:30px;padding-right:30px;padding-bottom:30px;padding-left:30px;flex-basis:50%">
		<!-- wp:heading {"fontSize":"x-large"} -->
		<h2 class="wp-block-heading has-x-large-font-size">Tech gifts under $100</h2>
		<!-- /wp:heading -->

		<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->
		<div class="wp-block-group">
			<!-- wp:image {"width":80,"height":107,"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full is-resized">
				<img src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/product-electronics-4.png', dirname( __FILE__ ) ) ); ?>" alt="" width="80" height="107" />
			</figure>
			<!-- /wp:image -->

			<!-- wp:image {"width":80,"height":108,"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full is-resized">
				<img src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/product-apparel-7.png', dirname( __FILE__ ) ) ); ?>" alt="" width="80" height="108" />
			</figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column {"width":"50%","style":{"spacing":{"padding":{"top":"30px","right":"30px","bottom":"30px","left":"30px"}},"color":{"background":"#d8f2f3"}}} -->
	<div class="wp-block-column has-background" style="background-color:#d8f2f3;padding-top:30px;padding-right:30px;padding-bottom:30px;padding-left:30px;flex-basis:50%">
		<!-- wp:heading {"fontSize":"x-large"} -->
		<h2 class="wp-block-heading has-x-large-font-size">For the gamers</h2>
		<!-- /wp:heading -->

		<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->
		<div class="wp-block-group">
			<!-- wp:image {"width":100,"height":60,"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full is-resized">
				<img src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/product-electronics-3.png', dirname( __FILE__ ) ) ); ?>" alt="" width="100" height="60" />
			</figure>
			<!-- /wp:image -->

			<!-- wp:image {"width":100,"height":100,"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full is-resized">
				<img src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/product-electronics-2.png', dirname( __FILE__ ) ) ); ?>" alt="" width="100" height="100" />
			</figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->
