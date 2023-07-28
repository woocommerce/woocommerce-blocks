<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * LastSeenProducts class.
 */
class LastSeenProducts extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'last-seen-products';

	/**
	 * The Block with its attributes before it gets rendered
	 *
	 * @var array
	 */
	protected $parsed_block;

	/**
	 * Initialize this block type.
	 *
	 * - Hook into WP lifecycle.
	 * - Register the block with WordPress.
	 * - Hook into pre_render_block to update the query.
	 */
	protected function initialize() {
		parent::initialize();
		add_filter(
			'pre_render_block',
			array( $this, 'update_query' ),
			10,
			2
		);

		add_filter(
			'render_block',
			array( $this, 'render_block' ),
			10,
			2
		);

	}

	/**
	 * It isn't necessary register block assets because it is a server side block.
	 */
	protected function register_block_type_assets() {
		return null;
	}

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return null;
	}

	/**
	 * Update the query for the product query block.
	 *
	 * @param string|null $pre_render The pre-rendered content. Default null.
	 * @param array       $parsed_block The block being rendered.
	 */
	public function update_query( $pre_render, $parsed_block ) {
		if ( 'core/query' !== $parsed_block['blockName'] ) {
			return;
		}

		$this->parsed_block = $parsed_block;

		if ( $this->is_last_seen_products_block( $parsed_block ) ) {
			// Set this so that our product filters can detect if it's a PHP template.
			add_filter(
				'query_loop_block_query_vars',
				array( $this, 'build_query' ),
				10,
				1
			);
		}
	}

	/**
	 * Return a custom query based on attributes, filters and global WP_Query.
	 *
	 * @param WP_Query $query The WordPress Query.
	 *
	 * @return array
	 */
	public function build_query( $query ) {

		$product_ids = $this->get_last_seen_products_ids( $query['posts_per_page'] );
		if ( empty( $product_ids ) ) {
			return array();
		}

		return array(
			'orderby'        => 'post__in',
			'post_type'      => 'product',
			'post__in'       => $product_ids,
			'post_status'    => 'publish',
			'posts_per_page' => $query['posts_per_page'],
		);
	}

	/**
	 * If there are no last seen products, return an empty string.
	 *
	 * @param string $content The block content.
	 * @param array  $block The block.
	 *
	 * @return string The block content.
	 */
	public function render_block( string $content, array $block ) {
		if ( ! $this->is_last_seen_products_block( $block ) ) {
			return $content;
		}

		$product_ids = $this->get_last_seen_products_ids();
		// If there are no last seen products, render nothing.
		if ( empty( $product_ids ) ) {
			return '';
		}

		return $content;
	}

	/**
	 * Determines whether the block is a last seen products block.
	 *
	 * @param array $block The block.
	 *
	 * @return bool Whether the block is a last seen products block.
	 */
	private function is_last_seen_products_block( $block ) {

		return ProductQuery::is_woocommerce_variation( $block ) && ( 'woocommerce/' . $this->block_name ) === $block['attrs']['namespace'];
	}

	/**
	 * Get last seen products ids from session var.
	 *
	 * @param number $product_per_page Products per page.
	 *
	 * @return array Products ids.
	 */
	private function get_last_seen_products_ids( $product_per_page = 5 ) {
		if ( ! WC()->session instanceof \WC_Session ) {
			return array();
		}

		return WC()->session->get( 'woocommerce_last_seen_products', array() );
	}

}
