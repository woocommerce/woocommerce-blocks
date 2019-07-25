<?php
/**
 * Featured category HTML.
 *
 * @package WooCommerce/Blocks
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="<?php echo esc_attr( $container_class ); ?>" style="<?php echo esc_attr( $container_style ); ?>">
	<h2 class="wc-block-featured-category__title"><?php echo wp_kses_post( $title ); ?></h2>

	<?php if ( $description ) : ?>
		<div class="wc-block-featured-category__description"><?php echo wp_kses_post( $description ); ?></div>
	<?php endif; ?>

	<div class="wc-block-featured-category__link"><?php echo wp_kses_post( $content ); ?></div>
</div>
