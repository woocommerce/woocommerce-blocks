<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * BlockTemplatesCompatibility class.
 *
 * To bridge the gap on compatibility with PHP hooks and blockified templates.
 *
 * @internal
 */
class BlockTemplatesCompatibility {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_filter( 'render_block_data', array( $this, 'update_render_block_data' ), 10, 3 );
		add_filter( 'render_block', array( $this, 'inject_hooks' ), 10, 2 );
	}

	public function update_render_block_data( $parsed_block, $source_block, $parent_block ) {
		if ( $parent_block ) {
			return $parsed_block;
		}

		array_walk( $parsed_block['innerBlocks'], array( $this, 'inner_blocks_walker' ) );

		return $parsed_block;
	}

	public function inject_hooks( $block_content, $block ) {
		if ( ! is_shop() && ! is_product_taxonomy() ) {
			return $block_content;
		}
		if ( 'core/post-title' !== $block['blockName'] ) {
			return $block_content;
		}
		if ( empty( $block['attrs']['isInherited'] ) ) {
			return $block_content;
		}
		return $block_content . ' - hello';
	}

	protected function inner_blocks_walker( &$block ) {
		if (
			$block['blockName'] === 'core/query' &&
			isset( $block['attrs']['namespace'] ) &&
			$block['attrs']['namespace'] === 'woocommerce/product-query' &&
			isset( $block['attrs']['query']['inherit'] ) &&
			$block['attrs']['query']['inherit']
		) {
			array_walk( $block['innerBlocks'], array( $this, 'inject_attribute' ) );
		}

		if ( ! empty( $block['innerBlocks'] ) ) {
			array_walk( $block['innerBlocks'], array( $this, 'inner_blocks_walker' ) );
		}
	}

	protected function inject_attribute( &$block ) {
		$block['attrs']['isInherited'] = 1;

		if ( ! empty( $block['innerBlocks'] ) ) {
			array_walk( $block['innerBlocks'], array( $this, 'inject_attribute' ) );
		}
	}

}
