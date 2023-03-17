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
	protected $single_product_inner_blocks_names = [];

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
	 * Update the context by injecting the correct post data
	 * for the Single Product inner blocks.
	 *
	 * @param array    $context Block context.
	 * @param array    $block Block attributes.
	 * @param WP_Block $parent_block Block instance.
	 *
	 * @return array Updated block context.
	 */
	public function update_context( $context, $block, $parent_block ) {
		if( $block['blockName'] === 'woocommerce/single-product'
			&& isset( $block['attrs']['productId'] ) ) {
				$this->product_id = $block['attrs']['productId'];

				$this->single_product_inner_blocks_names = array_reverse($this->extract_single_product_inner_block_names( $block ));
		}

		$this->replace_post_for_single_product_inner_block( $block, $context );

		return $context;
	}

	/**
	 * Extract the inner block names for the Single Product block.
	 *
	 * @param array $block Block attributes.
	 * @param array $result Array of inner block names.
	 *
	 * @return array Array of inner block names.
	 */
	protected function extract_single_product_inner_block_names($block, &$result = []) {
		if(isset($block['blockName'])){
			$result[] = $block['blockName'];
		}

		if(isset($block['innerBlocks'])){
			foreach ($block['innerBlocks'] as $inner_block) {
				$this->extract_single_product_inner_block_names($inner_block, $result);
			}
		}
		return $result;
	}

	/**
	 * Replace the global post for the Single Product inner blocks and reset it after.
	 *
	 * @param array $block Block attributes.
	 * @param array $context Block context.
	 */
	protected function replace_post_for_single_product_inner_block( $block, &$context ) {
		if( $this->single_product_inner_blocks_names ){
			$block_name = array_pop( $this->single_product_inner_blocks_names);

			if( $block_name === $block['blockName']){
				global $post;
				$post = get_post( $this->product_id );
				setup_postdata( $post );
				$context['postId'] = $this->product_id;
			}

			if ( ! $this->single_product_inner_blocks_names ) {
				wp_reset_postdata();
			}
		}
	}
}
