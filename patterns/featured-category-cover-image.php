<?php
/**
 * Title: Featured Category Cover Image
 * Slug: woocommerce-blocks/featured-category-cover-image
 * Categories: WooCommerce
 */

use Automattic\WooCommerce\Blocks\Patterns\PatternsHelper;
$content = PatternsHelper::get_pattern_content( 'woocommerce-blocks/featured-category-cover-image' );
$images  = PatternsHelper::get_pattern_images( 'woocommerce-blocks/featured-category-cover-image' );

$image1 = PatternsHelper::get_image_url( $images, 0, 'images/pattern-placeholders/shop-jeans.png' );
?>
<!-- wp:cover {"url":"<?php echo esc_url( $image1 ); ?>","id":1,"dimRatio":30,"customOverlayColor":"#000000","focalPoint":{"x":0,"y":0},"contentPosition":"center","align":"wide","style":{"spacing":{"padding":{"top":"2em","right":"2.25em","bottom":"2.25em","left":"2.25em"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-cover alignwide has-custom-content-position" style="padding-top:2em;padding-right:2.25em;padding-bottom:2.25em;padding-left:2.25em">
	<span aria-hidden="true" class="wp-block-cover__background has-background-dim-30 has-background-dim" style="background-color:#000000"></span>
	<img class="wp-block-cover__image-background wp-image-1" alt="<?php esc_attr_e( 'Placeholder image used to represent products being showcased in a featured category section.', 'woo-gutenberg-products-block' ); ?>" src="<?php echo esc_url( plugins_url( 'images/pattern-placeholders/wood-leather-fur-shop-jeans-shelf.png', dirname( __FILE__ ) ) ); ?>" style="object-position:0% 0%" data-object-fit="cover" data-object-position="0% 0%"/>
	<div class="wp-block-cover__inner-container">
		<!-- wp:heading {"textAlign":"center","style":{"color":{"text":"#ffffff"}}} -->
		<h2 class="wp-block-heading has-text-align-center has-text-color" style="color:#ffffff;">
			<?php echo esc_html( $content['titles'][0]['default'] ); ?>
		</h2>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#ffffff"},"spacing":{"margin":{"top":"0px","bottom":"0px"}}}} -->
		<p class="has-text-align-center has-text-color" style="color:#ffffff;margin-top:0px;margin-bottom:0px">
			<?php echo esc_html( $content['descriptions'][0]['default'] ); ?>
		</p>
		<!-- /wp:paragraph -->
		<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"30px"}}}} -->
		<div class="wp-block-buttons" style="margin-top:30px">
			<!-- wp:button {"textAlign":"center"} -->
			<div class="wp-block-button"><a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="wp-block-button__link has-text-align-center wp-element-button"><?php echo esc_html( $content['buttons'][0]['default'] ); ?></a></div>
			<!-- /wp:button --></div>
		<!-- /wp:buttons --></div>
</div>
<!-- /wp:cover -->
