<?php
/**
 * Product Grid.
 *
 * @package WooCommerce/Blocks
 */

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\Template;
?>
<div class="<?php echo esc_attr( $container_class ); ?>">
	<?php do_action( $hook_prefix . '_before_products_list', $template_args ); ?>

	<ul class="wc-block-grid__products">
		<?php Template::render( $products, 'products', $hook_prefix, $template_args ); ?>
	</ul>

	<?php do_action( $hook_prefix . '_after_products_list', $template_args ); ?>
</div>
