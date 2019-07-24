<?php
/**
 * Product Grid Item.
 *
 * @package WooCommerce/Blocks
 */

defined( 'ABSPATH' ) || exit;
?>
<li class="wc-block-grid__product">
	<a class="wc-block-grid__product-link" href="<?php echo esc_url( $permalink ); ?>">
		<div class="wc-block-grid__product-image"><?php echo wp_kses_post( $image ); ?></div>
		<div class="wc-block-grid__product-title"><?php echo wp_kses_post( $title ); ?></div>
	</a>

	<?php if ( $price ) : ?>
		<div class="wc-block-grid__product-price price"><?php echo wp_kses_post( $price ); ?></div>
	<?php endif; ?>

	<?php if ( $on_sale ) : ?>
		<span class="wc-block-grid__product-onsale"><?php esc_html_e( 'Sale!', 'woo-gutenberg-products-block' ); ?></span>
	<?php endif; ?>

	<?php if ( $rating ) : ?>
		<div class="wc-block-grid__product-rating"><?php echo wp_kses_post( $rating ); ?></div>
	<?php endif; ?>

	<?php if ( $button ) : ?>
		<div class="wc-block-grid__product-add-to-cart wp-block-button"><?php echo wp_kses_post( $button ); ?></div>
	<?php endif; ?>
</li>
