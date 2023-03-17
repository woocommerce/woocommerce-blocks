<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * SingleProduct class.
 */
class SingleProduct extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'single-product';
	protected $product_id = 0;

	/**
	 * API version name.
	 *
	 * @var string
	 */
	protected function initialize() {
		parent::initialize();
		add_filter( 'render_block_context', array( $this, 'update_context' ), 10, 3 );
	}


	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		$classname = $attributes['className'] ?? '';

		$html = sprintf(
			'<div class="wp-block-woocommerce-single-product %1$s">
				%2$s
			</div>',
			esc_attr( $classname ),
			$content
		);
		wp_reset_postdata();
		return $html;
	}

	/**
	 * Update the context for the block.
	 *
	 * @param array    $context Block context.
	 * @param array    $block Block attributes.
	 * @param WP_Block $parent_block Block instance.
	 *
	 * @return array Updated block context.
	 */
	public function update_context( $context, $block, $parent_block ) {
		if( $block['blockName'] === 'woocommerce/single-product-server-side'
			&& isset( $block['attrs']['productId'] ) ) {
				$this->product_id = $block['attrs']['productId'];
		}
		if( $this->product_id > 0 ){
			global $post;
			$post = get_post( $this->product_id );
			setup_postdata( $post );
			$context['postId'] = $this->product_id;
		}

		return $context;
	}
}
