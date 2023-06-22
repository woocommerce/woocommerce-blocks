<?php
/**
 * Title: Discount Banner with Image
 * Slug: woocommerce-blocks/discount-banner-with-image
 * Categories: WooCommerce
 */
?>

<!-- wp:group {"align":"wide","layout":{"type":"constrained","contentSize":"1000px"}} -->
<div class="wp-block-group alignwide">
	<!-- wp:columns {"verticalAlignment":"center","align":"wide","style":{"color":{"background":"#254094"}}} -->
	<div class="wp-block-columns alignwide are-vertically-aligned-center has-background" style="background-color:#254094">
		<!-- wp:column {"verticalAlignment":"center","width":"","style":{"spacing":{"padding":{"top":"25px","right":"40px","bottom":"40px","left":"60px"}}}} -->
		<div class="wp-block-column is-vertically-aligned-center" style="padding-top:25px;padding-right:40px;padding-bottom:40px;padding-left:60px">
			<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"500","fontSize":"45px"},"color":{"text":"#ffffff"}}} -->
			<p class="has-text-color" style="color:#ffffff;font-size:45px;font-style:normal;font-weight:500">UP TO</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"color":{"text":"#fdf251"},"typography":{"fontStyle":"normal","fontWeight":"800","fontSize":"90px","lineHeight":"0.1"}}} -->
			<p class="has-text-color" style="color:#fdf251;font-size:90px;font-style:normal;font-weight:800;line-height:0.1">40% off</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"300","fontSize":"35px"},"color":{"text":"#ffffff"}}} -->
			<p class="has-text-color" style="color:#ffffff;font-size:35px;font-style:normal;font-weight:300">Select products</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"style":{"color":{"background":"#ff7179","text":"#ffffff"},"border":{"radius":"40px"},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"30px","right":"30px"}}}} -->
				<div class="wp-block-button">
					<a class="wp-block-button__link has-text-color has-background wp-element-button" href="<?php echo esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ); ?>" style="border-radius:40px;color:#ffffff;background-color:#ff7179;padding-top:10px;padding-right:30px;padding-bottom:10px;padding-left:30px">Shop now</a>
				</div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center"} -->
		<div class="wp-block-column is-vertically-aligned-center">
			<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":{"topLeft":"100px","topRight":"10px","bottomLeft":"10px","bottomRight":"100px"}}}} -->
			<figure class="wp-block-image size-full has-custom-border">
				<img src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/table-floor-interior-atmosphere-living-room-furniture-square-lg.png', dirname( __FILE__ ) ) ); ?>" alt="" style="border-top-left-radius:100px;border-top-right-radius:10px;border-bottom-left-radius:10px;border-bottom-right-radius:100px" />
			</figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
