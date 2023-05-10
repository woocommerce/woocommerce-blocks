<?php
/**
 * Title: Product Details: product listing
 * Slug: woocommerce-blocks/product-details-listing
 * Categories: WooCommerce
 */
?>
<!-- wp:columns {"style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":{"top":"0","left":"0"}}}} -->
<div class="wp-block-columns" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
	<!-- wp:column {"style":{"spacing":{"blockGap":"0","padding":{"right":"0","bottom":"0","left":"0","top":"20px"}}}} -->
	<div class="wp-block-column" style="padding-top:20px;padding-right:0;padding-bottom:0;padding-left:0">
		<!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
		<figure class="wp-block-image size-full is-resized">
			<img src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/product-details-product-listing.jpg', dirname( __FILE__ ) ) ); ?>" alt="" />
		</figure>
		<!-- /wp:image -->
		<!-- wp:group {"style":{"spacing":{"padding":{"top":"0px","right":"0px","bottom":"0px","left":"0px"},"blockGap":"0px","margin":{"top":"40px","bottom":"40px","left":"32%"}}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
		<div class="wp-block-group is-content-justification-center" style="margin-top:40px;margin-bottom:40px;margin-left:32%;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"24px"},"textColor":"luminous-vivid-amber"} -->
			<p class="has-luminous-vivid-amber-color has-text-color" style="font-size:24px">★★★★</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"24px"}},"color":{"text":"#ffe8a4"},"spacing":{"margin":{"right":"5px"}}}} -->
			<p class="has-text-color" style="color:#ffe8a4;margin-right:5px;font-size:24px">★</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"16px"}},"textColor":"foreground"} -->
			<p class="has-foreground-color has-text-color" style="font-size:16px">
				<strong>4.2</strong>(1,079 reviews)
			</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
		<!-- wp:heading {"style":{"spacing":{"margin":{"bottom":"20px"}},"typography":{"fontSize":"48px","fontStyle":"normal","fontWeight":"700"}},"textColor":"black","fontSize":"x-large"} -->
		<h2 class="wp-block-heading has-black-color has-text-color has-text-align-center has-x-large-font-size" style="font-size:48px;font-style:normal;font-weight:700;margin-bottom:20px;">Bella Pro Series - 1.6-qt. Deep Fryer - Stainless Steel</h2>
		<!-- /wp:heading -->
		<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.2em"}},"textColor":"foreground"} -->
		<p class="has-foreground-color has-text-color has-text-align-center" style="font-size:1.2em">
			<strong><sup><sub>$</sub></sup>37.49</strong>
		</p>
		<!-- /wp:paragraph -->
		<!-- wp:buttons -->
		<div class="wp-block-buttons is-content-justification-center">
			<!-- wp:button {"backgroundColor":"foreground","textColor":"background","style":{"spacing":{"padding":{"left":"80px","right":"80px"}}}} -->
			<div class="wp-block-button"><a class="wp-block-button__link has-background-color has-foreground-background-color has-text-color has-background wp-element-button" style="padding-right:80px;padding-left:80px">Add to cart</a></div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->
