<?php
/**
 * Title: Featured Category Triple
 * Slug: woocommerce-blocks/featured-category-triple
 * Categories: WooCommerce
 */

use Automattic\WooCommerce\Blocks\Patterns\PatternsHelper;
$content = PatternsHelper::get_pattern_content( 'woocommerce-blocks/featured-category-triple' );

$images = PatternsHelper::get_pattern_images( 'woocommerce-blocks/featured-category-triple' );
$image1 = PatternsHelper::get_image_url( $images, 0, 'images/pattern-placeholders/sweet-restaurant-celebration-food-chocolate-cupcake.png' );
$image2 = PatternsHelper::get_image_url( $images, 1, 'images/pattern-placeholders/dish-meal-food-breakfast-dessert-eat.png' );
$image3 = PatternsHelper::get_image_url( $images, 2, 'images/pattern-placeholders/dish-food-baking-dessert-bread-bakery.png' );

$first_title  = $content['titles'][0]['default'] ?? '';
$second_title = $content['titles'][1]['default'] ?? '';
$third_title  = $content['titles'][2]['default'] ?? '';
?>

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"0px","left":"0px"},"padding":{"right":"var:preset|spacing|30","left":"var:preset|spacing|30","top":"0","bottom":"0"},"margin":{"top":"0px","bottom":"80px"}}}} -->
<div class="wp-block-columns alignwide" style="margin-top:0px;margin-bottom:80px;padding-top:0;padding-right:var(--wp--preset--spacing--30);padding-bottom:0;padding-left:var(--wp--preset--spacing--30)">
	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:cover {"url":"<?php echo esc_url( $image1 ); ?>","id":1,"dimRatio":0,"contentPosition":"bottom center","isDark":false,"style":{"spacing":{"padding":{"bottom":"56px"}}},"className":"has-white-color"} -->
		<div class="wp-block-cover is-light has-custom-content-position is-position-bottom-center has-white-color" style="padding-bottom:56px">
			<span aria-hidden="true" class="wp-block-cover__background has-background-dim-0 has-background-dim"></span>
			<img class="wp-block-cover__image-background wp-image-1" alt="<?php esc_attr_e( 'Placeholder image used to represent products being showcased in featured categories banner. 1 out of 3.', 'woo-gutenberg-products-block' ); ?>" src="<?php echo esc_url( $image1 ); ?>" data-object-fit="cover"/>
			<div class="wp-block-cover__inner-container">
				<!-- wp:heading {"textAlign":"center","level":4,"style":{"spacing":{"margin":{"bottom":"24px"}}}} -->
				<h4 class="wp-block-heading has-text-align-center" style="margin-bottom:24px"><?php echo esc_html( $first_title ); ?></h4>
				<!-- /wp:heading -->
				<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"spacing":{"padding":{"top":"0","bottom":"0"},"margin":{"top":"0","bottom":"0"}}}} -->
				<p class="has-text-align-center has-link-color" style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0">
					<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" data-type="link" data-id="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Shop Now', 'woo-gutenberg-products-block' ); ?></a>
				</p>
				<!-- /wp:paragraph -->
			</div>
		</div>
		<!-- /wp:cover -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:cover {"url":"<?php echo esc_url( $image2 ); ?>","id":1,"dimRatio":0,"contentPosition":"bottom center","isDark":false,"style":{"spacing":{"padding":{"bottom":"56px"}}},"className":"has-white-color"} -->
		<div class="wp-block-cover is-light has-custom-content-position is-position-bottom-center has-white-color" style="padding-bottom:56px">
			<span aria-hidden="true" class="wp-block-cover__background has-background-dim-0 has-background-dim"></span>
			<img class="wp-block-cover__image-background wp-image-1" alt="<?php esc_attr_e( 'Placeholder image used to represent products being showcased in featured categories banner. 2 out of 3.', 'woo-gutenberg-products-block' ); ?>" src="<?php echo esc_url( $image2 ); ?>" data-object-fit="cover"/>
			<div class="wp-block-cover__inner-container">
				<!-- wp:heading {"textAlign":"center","level":4,"style":{"spacing":{"margin":{"bottom":"24px"}}}} -->
				<h4 class="wp-block-heading has-text-align-center" style="margin-bottom:24px"><?php echo esc_html( $second_title ); ?></h4>
				<!-- /wp:heading -->
				<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"spacing":{"padding":{"top":"0","bottom":"0"},"margin":{"top":"0","bottom":"0"}}}} -->
				<p class="has-text-align-center has-link-color" style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0">
					<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" data-type="link" data-id="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Shop Now', 'woo-gutenberg-products-block' ); ?></a>
				</p>
				<!-- /wp:paragraph -->
			</div>
		</div>
		<!-- /wp:cover -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:cover {"url":"<?php echo esc_url( $image3 ); ?>","id":1,"dimRatio":0,"contentPosition":"bottom center","isDark":false,"style":{"spacing":{"padding":{"bottom":"56px"}}},"className":"has-white-color"} -->
		<div class="wp-block-cover is-light has-custom-content-position is-position-bottom-center has-white-color" style="padding-bottom:56px">
			<span aria-hidden="true" class="wp-block-cover__background has-background-dim-0 has-background-dim"></span>
			<img class="wp-block-cover__image-background wp-image-1" alt="<?php esc_attr_e( 'Placeholder image used to represent products being showcased in featured categories banner. 3 out of 3', 'woo-gutenberg-products-block' ); ?>" src="<?php echo esc_url( $image3 ); ?>" data-object-fit="cover"/>
			<div class="wp-block-cover__inner-container">
				<!-- wp:heading {"textAlign":"center","level":4,"style":{"spacing":{"margin":{"bottom":"24px"}}}} -->
				<h4 class="wp-block-heading has-text-align-center" style="margin-bottom:24px"><?php echo esc_html( $third_title ); ?></h4>
				<!-- /wp:heading -->
				<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"spacing":{"padding":{"top":"0","bottom":"0"},"margin":{"top":"0","bottom":"0"}}}} -->
				<p class="has-text-align-center has-link-color" style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0">
					<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" data-type="link" data-id="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Shop Now', 'woo-gutenberg-products-block' ); ?></a>
				</p>
				<!-- /wp:paragraph -->
			</div>
		</div>
		<!-- /wp:cover -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->
