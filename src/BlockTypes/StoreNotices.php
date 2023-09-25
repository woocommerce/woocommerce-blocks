<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

add_action( 'template_redirect', function () {
	wc_add_notice( __( 'Sorry there was a problem.', 'woocommerce' ), 'error' );
} );

/**
 * StoreNotices class.
 */
class StoreNotices extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'store-notices';

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
		woocommerce_output_all_notices();
		$notices = ob_get_clean();

		if ( ! $notices ) {
			return;
		}

		$classname          = isset( $attributes['className'] ) ? $attributes['className'] : '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		wc_store(
			array(
				'state' => array(
					'woocommerce' => array(
						'dismissServerNotices' => false,
						'notice' => array(
							"message" => "",
							"status" => "default",
						),
					),
				),
				'selectors' => array(
					'woocommerce' => array(
						'noticeClassNames' => '',
					),
				),
			),
		);

		return sprintf(
			'<div data-wc-interactive class="woocommerce wc-block-store-notices %1$s %2$s">
				<div data-wc-bind--hidden="state.woocommerce.dismissServerNotices">
					%3$s
				</div>
				<div data-wc-bind--hidden="state.woocommerce.notice.message">
					<div
						data-wc-bind--class="selectors.woocommerce.noticeClassNames"
					>
						<span data-wc-text="selectors.woocommerce.noticeIcon"></span>
						<span data-wc-text="state.woocommerce.notice.message"></span>
					</div>
				</div>
			</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			wc_kses_notice( $notices )
		);
	}

	/**
	 * Get the frontend script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 */
	protected function get_block_type_script( $key = null ) {
		$script = [
			'handle'       => 'wc-' . $this->block_name . '-interactivity-frontend',
			'path'         => $this->asset_api->get_block_asset_build_path( $this->block_name . '-interactivity' ),
			'dependencies' => [ 'wc-interactivity' ],
		];

		return $key ? $script[ $key ] : $script;
	}

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return null;
	}
}
