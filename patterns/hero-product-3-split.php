<?php
/**
 * Title: Hero Product 3 Split
 * Slug: woocommerce-blocks/hero-product-3-split
 * Categories: WooCommerce
 */

use Automattic\WooCommerce\Blocks\Patterns\PatternsHelper;
$content = PatternsHelper::get_pattern_content( 'woocommerce-blocks/hero-product-3-split' );
$images  = PatternsHelper::get_pattern_images( 'woocommerce-blocks/hero-product-3-split' );

$first_title  = $content['titles'][0]['default'] ?? '';
$second_title = $content['titles'][1]['default'] ?? '';
$third_title  = $content['titles'][2]['default'] ?? '';
$fourth_title = $content['titles'][3]['default'] ?? '';
$fifth_title  = $content['titles'][4]['default'] ?? '';

$first_description  = $content['descriptions'][0]['default'] ?? '';
$second_description = $content['descriptions'][1]['default'] ?? '';
$third_description  = $content['descriptions'][2]['default'] ?? '';
$fourth_description = $content['descriptions'][3]['default'] ?? '';
$fifth_description  = $content['descriptions'][4]['default'] ?? '';
?>

<!-- wp:columns {"align":"full","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"margin":{"top":"0px","bottom":"80px"},"blockGap":{"left":"0"}}}} -->
<div class="wp-block-columns alignfull" style="margin-top: 0px; margin-bottom: 80px; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0;">
	<!-- wp:column {"verticalAlignment":"center","width":"","style":{"spacing":{"padding":{"left":"60px"}}}} -->
	<div class="wp-block-column is-vertically-aligned-center" style="padding-left: 60px;">
		<!-- wp:group {"layout":{"type":"flex","orientation":"vertical","justifyContent":"left"}} -->
		<div class="wp-block-group">
			<!-- wp:heading {"className":"wp-block-heading"} -->
			<h2 class="wp-block-heading"><?php echo esc_html( $first_title ); ?></h2>
			<!-- /wp:heading -->
			<!-- wp:paragraph -->
			<p><?php echo esc_html( $first_description ); ?></p>
			<!-- /wp:paragraph -->
		<!-- wp:buttons -->
		<div class="wp-block-buttons">
			<!-- wp:button -->
			<div class="wp-block-button">
				<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="wp-block-button__link wp-element-button">
				<?php esc_attr_e( 'Shop now', 'woo-gutenberg-products-block' ); ?>
				</a>
			</div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
		</div>
			<!-- /wp:group  -->
	</div>
		<!-- /wp:column -->
		<!-- wp:column {"layout":{"type":"default"}} -->
		<div class="wp-block-column">
			<!-- wp:image {"aspectRatio":"9/16","scale":"cover"} -->
			<figure class="wp-block-image">
				<img
					src="<?php echo esc_url( PatternsHelper::get_image_url( $images, 0, 'images/pattern-placeholders/hand-guitar-finger-tshirt-clothing-rack.png' ) ); ?>"
					alt="<?php esc_attr_e( 'Placeholder image used to represent a product being showcased in a hero section.', 'woo-gutenberg-products-block' ); ?>"
					style="aspect-ratio: 9/16; object-fit: cover;"
				/>
			</figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"padding":{"right":"75px","left":"75px"}}}} -->
		<div class="wp-block-column is-vertically-aligned-center" style="padding-right: 75px; padding-left: 75px;">
			<!-- wp:paragraph -->
			<p>
				<strong><?php echo esc_html( $second_title ); ?></strong>
			</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p><?php echo esc_html( $second_description ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:separator {"className":"is-style-wide"} -->
			<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
			<!-- /wp:separator -->

			<!-- wp:paragraph -->
			<p>
				<strong><?php echo esc_html( $third_title ); ?></strong>
			</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p><?php echo esc_html( $third_description ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:separator {"className":"is-style-wide"} -->
			<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
			<!-- /wp:separator -->

			<!-- wp:paragraph -->
			<p>
				<strong><?php echo esc_html( $fourth_title ); ?></strong>
			</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p><?php echo esc_html( $fourth_description ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:separator {"className":"is-style-wide"} -->
			<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
			<!-- /wp:separator -->

			<!-- wp:paragraph -->
			<p>
				<strong><?php echo esc_html( $fifth_title ); ?></strong>
			</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p><?php echo esc_html( $fifth_description ); ?></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
