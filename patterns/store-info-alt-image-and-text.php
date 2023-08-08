<?php
/**
 * Title: Alternating Image and Text
 * Slug: woocommerce-blocks/alt-image-and-text
 * Categories: WooCommerce
 */
?>
<!-- wp:group {"align":"wide"} -->
<div class="wp-block-group alignwide">
	<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"0","left":"0"}}}} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"verticalAlignment":"center","width":"50%","style":{"spacing":{"padding":{"right":"0","left":"0"}}}} -->
		<div class="wp-block-column is-vertically-aligned-center" style="padding-right:0;padding-left:0;flex-basis:50%">
			<!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full">
				<img src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/crafting-pots.png', dirname( __FILE__ ) ) ); ?>" alt="<?php esc_attr_e( 'Placeholder image used to represent a person making a clay pot.', 'woo-gutenberg-products-block' ); ?>" />
			</figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"50%","style":{"spacing":{"blockGap":"0"}}} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
			<!-- wp:paragraph {"placeholder":"Content…","style":{"typography":{"textTransform":"uppercase"},"spacing":{"margin":{"left":"var:preset|spacing|30"}}}} -->
			<p style="margin-left:var(--wp--preset--spacing--30);text-transform:uppercase"><?php esc_html_e( 'The goods', 'woo-gutenberg-products-block' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"top":"0","bottom":"0","left":"var:preset|spacing|30"}}}} -->
			<h3 class="wp-block-heading" style="margin-top:0;margin-bottom:0;margin-left:var(--wp--preset--spacing--30)"><?php esc_html_e( 'Created with love and care in Australia', 'woo-gutenberg-products-block' ); ?></h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"spacing":{"margin":{"left":"var:preset|spacing|30"}}}} -->
			<p style="margin-left:var(--wp--preset--spacing--30)"><?php esc_html_e( 'All items are 100% hand-made, using the potter’s wheel or traditional techniques.', 'woo-gutenberg-products-block' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:list {"style":{"spacing":{"margin":{"left":"var:preset|spacing|30"}}}} -->
			<ul style="margin-left:var(--wp--preset--spacing--30)">
				<!-- wp:list-item -->
				<li><?php esc_html_e( 'Timeless style.', 'woo-gutenberg-products-block' ); ?></li>
				<!-- /wp:list-item -->

				<!-- wp:list-item -->
				<li><?php esc_html_e( 'Earthy, organic feel.', 'woo-gutenberg-products-block' ); ?></li>
				<!-- /wp:list-item -->

				<!-- wp:list-item -->
				<li><?php esc_html_e( 'Enduring quality.', 'woo-gutenberg-products-block' ); ?></li>
				<!-- /wp:list-item -->

				<!-- wp:list-item -->
				<li><?php esc_html_e( 'Unique, one-of-a-kind pieces.', 'woo-gutenberg-products-block' ); ?></li>
				<!-- /wp:list-item -->
			</ul>
			<!-- /wp:list -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:columns {"align":"wide","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":{"top":"0","left":"0"}}}} -->
	<div class="wp-block-columns alignwide" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
		<!-- wp:column {"verticalAlignment":"center","width":"50%","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"}}}} -->
		<div class="wp-block-column is-vertically-aligned-center" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;flex-basis:50%">
			<!-- wp:paragraph {"placeholder":"Content…","style":{"typography":{"textTransform":"uppercase"},"spacing":{"margin":{"right":"var:preset|spacing|30"}}}} -->
			<p style="margin-right:var(--wp--preset--spacing--30);text-transform:uppercase"><?php esc_html_e( 'About us', 'woo-gutenberg-products-block' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"top":"0","bottom":"0","right":"var:preset|spacing|30"}}}} -->
			<h3 class="wp-block-heading" style="margin-top:0;margin-right:var(--wp--preset--spacing--30);margin-bottom:0"><?php esc_html_e( 'Marl is an independent studio and artisanal gallery', 'woo-gutenberg-products-block' ); ?></h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"spacing":{"margin":{"right":"var:preset|spacing|30"}}}} -->
			<p style="margin-right:var(--wp--preset--spacing--30)"><?php esc_html_e( 'We specialize in limited collections of handmade tableware. We collaborate with restaurants and cafes to create unique items that complement the menu perfectly. Please get in touch if you want to know more about our process and pricing.', 'woo-gutenberg-products-block' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|30"}}},"fontSize":"small"} -->
			<div class="wp-block-buttons has-custom-font-size has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--30)">
				<!-- wp:button {"className":"is-style-outline"} -->
				<div class="wp-block-button is-style-outline">
					<a class="wp-block-button__link wp-element-button"><?php esc_html_e( 'Learn more', 'woo-gutenberg-products-block' ); ?></a>
				</div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"50%","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":"0"}}} -->
		<div class="wp-block-column is-vertically-aligned-center" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;flex-basis:50%">
			<!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full">
				<img src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/hand-made-pots.png', dirname( __FILE__ ) ) ); ?>" alt="<?php esc_attr_e( 'Placeholder image used to represent clay pots.', 'woo-gutenberg-products-block' ); ?>" />
			</figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
