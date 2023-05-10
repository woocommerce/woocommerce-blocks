<?php
/**
 * Title: Product Hero
 * Slug: woocommerce-blocks/product-hero
 * Categories: WooCommerce
 */
?>
<!-- wp:group {"align":"wide","style":{"color":{"background":"#6b7ba8"},"spacing":{"blockGap":"0","padding":{"top":"1em","right":"1em","bottom":"1em","left":"1em"}}},"textColor":"background","layout":{"type":"constrained","contentSize":"100%","justifyContent":"left"}} -->
<div class="wp-block-group alignwide has-background-color has-text-color has-background" style="background-color:#6b7ba8;padding-top:1em;padding-right:1em;padding-bottom:1em;padding-left:1em">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column {"width":"40%"} -->
		<div class="wp-block-column" style="flex-basis:40%"><!-- wp:image {"id":1,"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full"><img src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/product-electronics-1.png', dirname( __FILE__ ) ) ); ?>" alt="" class="wp-image-1"/></figure>
			<!-- /wp:image --></div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"60%","style":{"spacing":{"padding":{"top":"3em","left":"0em","bottom":"3em"}}}} -->
		<div class="wp-block-column" style="padding-top:3em;padding-bottom:3em;padding-left:0em;flex-basis:60%">
			<!-- wp:heading {"style":{"typography":{"lineHeight":"0"}},"textColor":"base","fontSize":"large"} -->
			<h2 class="wp-block-heading has-base-color has-text-color has-large-font-size" style="line-height:0">Mini 5 Dreamer</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"1em"}},"textColor":"base"} -->
			<p class="has-base-color has-text-color" style="font-size:1em"><strong>$1,999</strong></p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"backgroundColor":"contrast","textColor":"base","style":{"typography":{"fontSize":"0.8em"},"spacing":{"padding":{"left":"2em","right":"2em"}}}} -->
				<div class="wp-block-button has-custom-font-size" style="font-size:0.8em"><a class="wp-block-button__link has-base-color has-contrast-background-color has-text-color has-background wp-element-button" style="padding-right:2em;padding-left:2em">Add to cart</a></div>
				<!-- /wp:button --></div>
			<!-- /wp:buttons -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.8em"}},"textColor":"base"} -->
			<p class="has-base-color has-text-color" style="font-size:0.8em">Do anything you can imagine with a single unit. Chorus, distortion, echo, wah, volume and more can all be applied and controlled from a single pedal-sized unit. The all-in-one Mini 5 Dreamer is on the pedal board of your favorite artists.</p>
			<!-- /wp:paragraph --></div>
		<!-- /wp:column --></div>
	<!-- /wp:columns --></div>
<!-- /wp:group -->
