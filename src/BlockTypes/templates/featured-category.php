<?php
/**
 * Featured category HTML.
 *
 * @package WooCommerce/Blocks
 */

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\Template;
?>
<div class="<?php echo esc_attr( $container_class ); ?>" style="<?php echo esc_attr( $container_style ); ?>">
	<?php do_action( $hook_prefix . '_before_featured_category', $template_args ); ?>

	<?php Template::render( '<h2 class="wc-block-featured-category__title">' . wp_kses_post( $title ) . '</h2>', 'title', $hook_prefix, $template_args ); ?>

	<?php if ( $description ) : ?>
		<?php Template::render( '<div class="wc-block-featured-category__description">' . wp_kses_post( $description ) . '</div>', 'description', $hook_prefix, $template_args ); ?>
	<?php endif; ?>

	<?php Template::render( '<div class="wc-block-featured-category__link">' . wp_kses_post( $content ) . '</div>', 'link', $hook_prefix, $template_args ); ?>

	<?php do_action( $hook_prefix . '_after_featured_category', $template_args ); ?>
</div>
