<?php
/**
 * Featured product HTML.
 *
 * @package WooCommerce/Blocks
 */

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\Template;
?>
<div class="<?php echo esc_attr( $container_class ); ?>" style="<?php echo esc_attr( $container_style ); ?>">
	<?php do_action( $hook_prefix . '_before_featured_product', $template_args ); ?>

	<?php Template::render( '<h2 class="wc-block-featured-product__title">' . wp_kses_post( $title ) . '</h2>', 'title', $hook_prefix, $template_args ); ?>

	<?php if ( $variation ) : ?>
		<?php Template::render( '<h3 class="wc-block-featured-product__variation">' . wp_kses_post( $variation ) . '</h3>', 'variation', $hook_prefix, $template_args ); ?>
	<?php endif; ?>

	<?php if ( $description ) : ?>
		<?php Template::render( '<div class="wc-block-featured-product__description">' . wp_kses_post( $description ) . '</div>', 'description', $hook_prefix, $template_args ); ?>
	<?php endif; ?>

	<?php if ( $price ) : ?>
		<?php Template::render( '<div class="wc-block-featured-product__price">' . wp_kses_post( $price ) . '</div>', 'price', $hook_prefix, $template_args ); ?>
	<?php endif; ?>

	<?php Template::render( '<div class="wc-block-featured-product__link">' . wp_kses_post( $content ) . '</div>', 'link', $hook_prefix, $template_args ); ?>

	<?php do_action( $hook_prefix . '_after_featured_product', $template_args ); ?>
</div>
