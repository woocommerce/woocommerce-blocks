<?php
/**
 * Title: Hero Product Chessboard
 * Slug: woocommerce-blocks/hero-product-chessboard
 * Categories: WooCommerce
 */

use Automattic\WooCommerce\Blocks\Patterns\PatternsHelper;
$content = PatternsHelper::get_pattern_content( 'woocommerce-blocks/hero-product-chessboard' );
$images  = PatternsHelper::get_pattern_images( 'woocommerce-blocks/hero-product-chessboard' );

$image1 = PatternsHelper::get_image_url( $images, 0, 'images/pattern-placeholders/sweet-restaurant-celebration-food-chocolate-cupcake.png' );
$image2 = PatternsHelper::get_image_url( $images, 1, 'images/pattern-placeholders/dish-meal-food-breakfast-dessert-eat.png' );

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

<!-- wp:group {"align":"full","style":{"spacing":{"margin":{"top":"0px","bottom":"80px"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull" style="margin-top:0px;margin-bottom:80px">
	<!-- wp:columns {"align":"full","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":{"top":"0","left":"0"}}}} -->
	<div class="wp-block-columns alignfull" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:cover {"url":"<?php echo esc_url( $image1 ); ?>","dimRatio":0,"focalPoint":{"x":0.54,"y":0.52},"isDark":false,"style":{"color":{}}} -->
			<div class="wp-block-cover is-light">
				<img class="wp-block-cover__image-background" alt="<?php esc_attr_e( 'Placeholder image used to represent a product being showcased in a hero section. 1 out of 2.', 'woo-gutenberg-products-block' ); ?>" src="<?php echo esc_url( $image1 ); ?>" style="object-position:54% 52%" data-object-fit="cover" data-object-position="54% 52%"/>
				<div class="wp-block-cover__inner-container">
					<!-- wp:paragraph {"align":"center","placeholder":"Write title…","fontSize":"large"} -->
						<p class="has-text-align-center has-large-font-size"> </p>
					<!-- /wp:paragraph -->
				</div>
			</div>
			<!-- /wp:cover -->
		</div>
		<!-- /wp:column -->


		<!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"}}},"layout":{"type":"constrained"}} -->
		<div class="wp-block-column is-vertically-aligned-center" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
			<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"0px","right":"60px","bottom":"0px","left":"60px"},"margin":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}}} -->
			<div class="wp-block-group alignfull" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:var(--wp--preset--spacing--40);padding-top:0px;padding-right:60px;padding-bottom:0px;padding-left:60px">
				<!-- wp:heading {"textAlign":"left","level":3} -->
				<h3 class="wp-block-heading has-text-align-left has-large-font-size"><strong><?php echo esc_html( $fifth_title ); ?></strong></h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|40"}}}} -->
				<p style="margin-bottom:var(--wp--preset--spacing--40)"><?php echo esc_html( $fifth_description ); ?></p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"64px"}}}} -->
				<div class="wp-block-buttons" style="margin-top:64px">
					<!-- wp:button {"textAlign":"left"} -->
					<div class="wp-block-button has-custom-font-size">
						<a class="wp-block-button__link has-text-align-left wp-element-button" href="<?php echo esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ); ?>">Shop now</a>
					</div>
					<!-- /wp:button -->
				</div>
				<!-- /wp:buttons -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:columns {"verticalAlignment":"center","align":"full","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":{"top":"0","left":"0"},"margin":{"top":"0","bottom":"0"}}}} -->
	<div class="wp-block-columns alignfull are-vertically-aligned-center" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
		<!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"}}}} -->
		<div class="wp-block-column is-vertically-aligned-center" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
			<!-- wp:group {"style":{"spacing":{"padding":{"top":"50px","right":"50px","bottom":"50px","left":"50px"}}},"layout":{"type":"flex","orientation":"vertical"}} -->
			<div class="wp-block-group" style="padding-top:50px;padding-right:50px;padding-bottom:50px;padding-left:50px">
				<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"60px"}}}} -->
				<div class="wp-block-columns">
					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:heading {"level":4,"style":{"typography":{"textTransform":"capitalize"}, "spacing":{"margin":{"bottom":"16px"}}}} -->
						<h4 class="wp-block-heading" style="text-transform:capitalize; margin-bottom:16px"><strong><?php echo esc_html( $second_title ); ?></strong></h4>
						<!-- /wp:heading -->

						<!-- wp:paragraph {"style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"margin":{"top":"var:preset|spacing|20","right":"0","bottom":"0","left":"0"}}}} -->
						<p style="margin-top:var(--wp--preset--spacing--20);margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;"><?php echo esc_html( $second_description ); ?></p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:column -->

					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:heading {"level":4,"style":{"typography":{"textTransform":"capitalize"}, "spacing":{"margin":{"bottom":"16px"}}}} -->
						<h4 class="wp-block-heading" style="text-transform:capitalize; margin-bottom:16px"><strong><?php echo esc_html( $third_title ); ?></strong></h4>
						<!-- /wp:heading -->

						<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"var:preset|spacing|20"}}}} -->
						<p style="margin-top:var(--wp--preset--spacing--20)"><?php echo esc_html( $third_description ); ?></p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:column -->
				</div>
				<!-- /wp:columns -->

				<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"60px"}}}} -->
				<div class="wp-block-columns">
					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:heading {"level":4,"style":{"typography":{"textTransform":"capitalize"}, "spacing":{"margin":{"bottom":"16px"}}}} -->
						<h4 class="wp-block-heading" style="text-transform:capitalize; margin-bottom:16px"><strong><?php echo esc_html( $fourth_title ); ?></strong></h4>
						<!-- /wp:heading -->

						<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"var:preset|spacing|20"}}}} -->
						<p style="margin-top:var(--wp--preset--spacing--20)"><?php echo esc_html( $fourth_description ); ?></p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:column -->

					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:heading {"level":4,"style":{"typography":{"textTransform":"capitalize"}, "spacing":{"margin":{"bottom":"16px"}}}} -->
						<h4 class="wp-block-heading" style="text-transform:capitalize; margin-bottom:16px;"><strong><?php echo esc_html( $fifth_title ); ?></strong></h4>
						<!-- /wp:heading -->

						<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"var:preset|spacing|20","right":"0","bottom":"0","left":"0"}}}} -->
						<p style="margin-top:var(--wp--preset--spacing--20);margin-right:0;margin-bottom:0;margin-left:0"><?php echo esc_html( $fifth_description ); ?></p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:column -->
				</div>
				<!-- /wp:columns -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center"} -->
		<div class="wp-block-column is-vertically-aligned-center">
			<!-- wp:cover {"url":"<?php echo esc_url( $image2 ); ?>","dimRatio":0,"focalPoint":{"x":0.33,"y":0.06},"style":{"color":{}}} -->
			<div class="wp-block-cover">
				<img class="wp-block-cover__image-background" alt="<?php esc_attr_e( 'Placeholder image used to represent a product being showcased in a hero section. 2 out of 2.', 'woo-gutenberg-products-block' ); ?>" src="<?php echo esc_url( $image2 ); ?>" style="object-position:33% 6%" data-object-fit="cover" data-object-position="33% 6%"/>
				<div class="wp-block-cover__inner-container">
					<!-- wp:paragraph {"align":"center","placeholder":"Write title…","fontSize":"large"} -->
						<p class="has-text-align-center has-large-font-size"> </p>
					<!-- /wp:paragraph -->
				</div>
			</div>
			<!-- /wp:cover -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
