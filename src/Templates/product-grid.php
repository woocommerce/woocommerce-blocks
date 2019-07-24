<?php
/**
 * Product Grid.
 *
 * @package WooCommerce/Blocks
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="<?php echo esc_attr( $container_class ); ?>">
	<ul class="wc-block-grid__products">
		<?php echo implode( '', $product_grid_items ); // phpcs:ignore ?>
	</ul>
</div>
