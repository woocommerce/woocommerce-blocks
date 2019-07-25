<?php
/**
 * Product Grid Item.
 *
 * @package WooCommerce/Blocks
 */

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\Template;
?>
<li class="wc-block-grid__product">
	<?php do_action( $hook_prefix . '_before_product', $template_args ); ?>

	<?php Template::render( '<a class="wc-block-grid__product-link" href="' . esc_url( $permalink ) . '">', 'product_link', $hook_prefix, $template_args ); ?>
		<?php Template::render( '<div class="wc-block-grid__product-image">' . wp_kses_post( $image ) . '</div>', 'image', $hook_prefix, $template_args ); ?>
		<?php Template::render( '<div class="wc-block-grid__product-title">' . wp_kses_post( $title ) . '</div>', 'title', $hook_prefix, $template_args ); ?>
	<?php Template::render( '</a>', 'product_link_close', $hook_prefix, $template_args ); ?>

	<?php if ( $price ) : ?>
		<?php Template::render( '<div class="wc-block-grid__product-price price">' . wp_kses_post( $price ) . '</div>', 'price', $hook_prefix, $template_args ); ?>
	<?php endif; ?>

	<?php if ( $on_sale ) : ?>
		<?php Template::render( '<span class="wc-block-grid__product-onsale">' . esc_html__( 'Sale!', 'woo-gutenberg-products-block' ) . '</span>', 'onsale', $hook_prefix, $template_args ); ?>
	<?php endif; ?>

	<?php if ( $rating ) : ?>
		<?php Template::render( '<div class="wc-block-grid__product-rating">' . wp_kses_post( $rating ) . '</div>', 'rating', $hook_prefix, $template_args ); ?>
	<?php endif; ?>

	<?php if ( $button ) : ?>
		<?php Template::render( '<div class="wc-block-grid__product-add-to-cart wp-block-button">' . wp_kses_post( $button ) . '</div>', 'add_to_cart', $hook_prefix, $template_args ); ?>
	<?php endif; ?>

	<?php do_action( $hook_prefix . '_after_product', $template_args ); ?>
</li>
