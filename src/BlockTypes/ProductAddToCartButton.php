<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductAddToCartButton class.
 */
class ProductAddToCartButton extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-add-to-cart-button';

	/**
	 * API version name.
	 *
	 * @var string
	 */
	protected $api_version = '2';

	/**
	 * Initialize this block type.
	 *
	 * - Hook into WP lifecycle.
	 * - Register the block with WordPress.
	 * - Hook into pre_render_block to update the query.
	 */
	protected function initialize() {
		parent::initialize();
		// add_filter(
		// 'render_block_context',
		// array( $this, 'render_block_context' ),
		// 10,
		// 3
		// );
		add_filter(
			'render_block',
			[ $this, 'on_render_block' ],
			10,
			3
		);
		// add_filter(
		// 'pre_render_block',
		// array( $this, 'update_query' ),
		// 10,
		// 3
		// );
	}

	/**
	 * Register the context.
	 */
	protected function get_block_type_uses_context() {
		return [ 'query', 'queryId', 'postId' ];
	}


	// public function update_query( $attributes, $content, $parent_block ) {
	// if ( 'core/button' !== $content['blockName'] ) {
	// return;
	// }

	// if ( $this->is_woocommerce_variation( $content ) ) {
	// do_action( 'qm/debug', $parent_block );
	// }

	// return array( $attributes, $content );
	// }

	public function render_block_context( $context ) {
		// do_action( 'qm/debug', $context );
		return $context;
	}

	/**
	 * Update the query for the product query block.
	 *
	 * @param string|null $pre_render   The pre-rendered content. Default null.
	 * @param array       $parsed_block The block being rendered.
	 */
	// public function on_render_block( $block_content, $block, $instance ) {
	// if ( 'core/button' !== $block['blockName'] ) {
	// return $block_content;
	// }

	// if ( $this->is_woocommerce_variation( $block ) ) {
	// do_action( 'qm/debug', $instance );
	// Read context from $instance
	// do_action( 'qm/debug', $instance->__get( 'context' ) );

	// Replace 'Add to Cart' in $block_content with "Manish"
	// return str_replace( 'Add to cart', '<button href="?add-to-cart=24" rel="nofollow" data-product_id="24" data-product_sku="woo-album">Add to cart</button>', $block_content );

	// }

	// return $block_content;
	// }

	public function on_render_block( $block_content, $block, $instance ) {
		if ( 'core/button' !== $block['blockName'] ) {
			return $block_content;
		}

		if ( $this->is_woocommerce_variation( $block ) ) {
			return str_replace(
				'Add to cart',
				'<button href="?add-to-cart=24" rel="nofollow" data-product_id="24" data-product_sku="woo-album" class="ajax_add_to_cart add_to_cart_button ">Add to cart</button>',
				$block_content
			);
			// return apply_filters(
			// 'woocommerce_loop_add_to_cart_link',
			// '<button href="?add-to-cart=24" rel="nofollow" data-product_id="24" data-product_sku="woo-album" class="ajax_add_to_cart add_to_cart_button ">Add to cart</button>'
			// );
		}

		return $block_content;
	}

	/**
	 * Check if a given block
	 *
	 * @param array $parsed_block The block being rendered.
	 * @return boolean
	 */
	private function is_woocommerce_variation( $parsed_block ) {
		return isset( $parsed_block['attrs']['__woocommerceNamespace'] )
		&& substr( $parsed_block['attrs']['__woocommerceNamespace'], 0, 11 ) === 'woocommerce';
	}
}
