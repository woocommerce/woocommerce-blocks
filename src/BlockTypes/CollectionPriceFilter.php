<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * CollectionPriceFilter class.
 */
final class CollectionPriceFilter extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'collection-price-filter';

	const MIN_PRICE_QUERY_VAR = 'min_price';
	const MAX_PRICE_QUERY_VAR = 'max_price';

	/**
	 * Initialize this block type.
	 *
	 * - Hook into WP lifecycle.
	 * - Register the block with WordPress.
	 */
	protected function initialize() {
		parent::initialize();
		add_action( 'render_block_context', array( $this, 'modify_inner_blocks_context' ), 10, 3 );
	}

	/**
	 * Modify the context of inner blocks.
	 *
	 * @param array    $context The block context.
	 * @param array    $parsed_block The parsed block.
	 * @param WP_Block $parent_block The parent block.
	 * @return array
	 */
	public function modify_inner_blocks_context( $context, $parsed_block, $parent_block ) {
		if (
			is_admin() ||
			! is_a( $parent_block, 'WP_Block' ) ||
			"woocommerce/{$this->block_name}" !== $parent_block->name ||
			empty( $parent_block->context['collectionData']['price_range'] )
		) {
			return $context;
		}

		$context['filterData'] = $this->get_filter_data( $parent_block->context['collectionData'] );

		return $context;
	}

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content    Block content.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		// Short circuit if the collection data isn't ready yet.
		if ( empty( $block->context['collectionData']['price_range'] ) ) {
			return $content;
		}

		wc_store(
			array(
				'state' => array(
					'filters' => $this->get_filter_data( $block->context['collectionData'] ),
				),
			)
		);

		$filter_reset_button = sprintf(
			' <button class="wc-block-components-filter-reset-button" data-wc-on--click="actions.filters.reset">
				<span aria-hidden="true">%1$s</span>
				<span class="screen-reader-text">%2$s</span>
			</button>',
			__( 'Reset', 'woo-gutenberg-products-block' ),
			__( 'Reset filter', 'woo-gutenberg-products-block' ),
		);

		$inner_blocks_output = array_reduce(
			iterator_to_array( $block->inner_blocks ),
			function( $output, $block ) {
				$output .= $block->render();
				return $output;
			},
			''
		);

		return sprintf(
			'<div %1$s>
				%2$s
				<div class="actions">
					%3$s
				</div>
			</div>',
			get_block_wrapper_attributes(),
			$inner_blocks_output,
			$filter_reset_button
		);
	}

	/**
	 * Prepare filter data for Interactivity API and inner blocks.
	 *
	 * @param array $collection_data The collection data.
	 * @return string
	 */
	private function get_filter_data( $collection_data ) {
		$price_range = $collection_data['price_range'];
		$min_range   = $price_range->min_price / 10 ** $price_range->currency_minor_unit;
		$max_range   = $price_range->max_price / 10 ** $price_range->currency_minor_unit;
		$min_price   = intval( get_query_var( self::MIN_PRICE_QUERY_VAR, $min_range ) );
		$max_price   = intval( get_query_var( self::MAX_PRICE_QUERY_VAR, $max_range ) );

		return array(
			'minPrice' => $min_price,
			'maxPrice' => $max_price,
			'minRange' => $min_range,
			'maxRange' => $max_range,
		);
	}
}
