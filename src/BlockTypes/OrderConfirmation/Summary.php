<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * Summary class.
 */
class Summary extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-summary';

	/**
	 * Track removed hooks.
	 *
	 * @var array
	 */
	protected $removed_hooks = [];

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string | void Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		ob_start();
		$this->remove_hooks();
		wc_get_template( 'checkout/thankyou.php', array( 'order' => $this->get_order() ) );
		$this->restore_hooks();
		$content = ob_get_clean();

		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		return sprintf(
			'<div class="woocommerce wc-block-order-%4$s %1$s %2$s">%3$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			$content,
			esc_attr( $this->block_name )
		);
	}

	/**
	 * Remove core hooks from the thankyou page.
	 */
	protected function remove_hooks() {
		if ( has_action( 'woocommerce_thankyou', 'woocommerce_order_details_table', 10 ) ) {
			remove_action( 'woocommerce_thankyou', 'woocommerce_order_details_table', 10 );
			$this->removed_hooks[] = 'woocommerce_order_details_table';
		}
	}

	/**
	 * Restore core hooks after the thankyou page.
	 */
	protected function restore_hooks() {
		if ( in_array( 'woocommerce_order_details_table', $this->removed_hooks, true ) ) {
			add_action( 'woocommerce_thankyou', 'woocommerce_order_details_table', 10 );
		}
		$this->removed_hooks = [];
	}
}
