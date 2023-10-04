<?php
/**
 * Title: Just Arrived Full Hero
 * Slug: woocommerce-blocks/just-arrived-full-hero
 * Categories: WooCommerce
 */

use Automattic\WooCommerce\Blocks\Patterns\PatternsHelper;
$content = PatternsHelper::get_pattern_content( 'woocommerce-blocks/just-arrived-full-hero' );
$images  = PatternsHelper::get_pattern_images( 'woocommerce-blocks/just-arrived-full-hero' );

$image1 = PatternsHelper::get_image_url( $images, 0, 'images/pattern-placeholders/plant-in-vase.jpg' );
?>
<!-- wp:cover {"url":"<?php echo esc_url( $image1 ); ?>","dimRatio":0,"minHeight":739,"contentPosition":"center right","isDark":false,"align":"full","style":{"spacing":{"padding":{"right":"4em"}}}} -->
<div class="wp-block-cover alignfull is-light has-custom-content-position is-position-center-right" style="padding-right:4em;min-height:739px">
<span aria-hidden="true" class="wp-block-cover__background has-background-dim-0 has-background-dim"></span>
<img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( $image1 ); ?>" data-object-fit="cover"/>
<div class="wp-block-cover__inner-container">
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"fontSize":"x-large","anchor":"just-arrived"} -->
<h2 class="wp-block-heading has-x-large-font-size" id="just-arrived" style="font-style:normal;font-weight:700"><?php echo esc_html( $content['titles'][0]['default'] ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"medium"} -->
<p class="has-medium-font-size"><?php echo esc_html( $content['descriptions'][0]['default'] ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"black","textColor":"white","className":"is-style-fill","fontSize":"small"} -->
<div class="wp-block-button has-custom-font-size is-style-fill has-small-font-size"><a class="wp-block-button__link has-white-color has-black-background-color has-text-color has-background wp-element-button">Shop now</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div></div>
<!-- /wp:cover -->
