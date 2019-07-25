<?php
/**
 * Featured product HTML.
 *
 * @package WooCommerce/Blocks
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="<?php echo esc_attr( $container_class ); ?>" style="<?php echo esc_attr( $container_style ); ?>">
	<h2 class="wc-block-featured-product__title"><?php echo wp_kses_post( $title ); ?></h2>

	<?php if ( $variation ) : ?>
		<h3 class="wc-block-featured-product__variation"><?php echo wp_kses_post( $variation ); ?></h3>
	<?php endif; ?>

	<?php if ( $description ) : ?>
		<div class="wc-block-featured-product__description"><?php echo wp_kses_post( $description ); ?></div>
	<?php endif; ?>

	<?php if ( $price ) : ?>
		<div class="wc-block-featured-product__price"><?php echo wp_kses_post( $price ); ?></div>
	<?php endif; ?>

	<div class="wc-block-featured-product__link"><?php echo wp_kses_post( $content ); ?></div>
</div>
