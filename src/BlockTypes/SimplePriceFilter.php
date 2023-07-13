<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * SimplePriceFilter class.
 */
class SimplePriceFilter extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name     = 'simple-price-filter';
	const MIN_PRICE_QUERY_VAR = 'min_price';
	const MAX_PRICE_QUERY_VAR = 'max_price';

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string Rendered block output.
	 */
	public function render( $attributes = [], $content = '', $block = null ) {
		$wrapper_attributes = get_block_wrapper_attributes();
		$max_range          = 90; // This value should come from DB.
		$min_price          = get_query_var( self::MIN_PRICE_QUERY_VAR, 0 );
		$max_price          = get_query_var( self::MAX_PRICE_QUERY_VAR, $max_range );

		// CSS variables for the range bar style.
		$__low       = 100 * $min_price / $max_range;
		$__high      = 100 * $max_price / $max_range;
		$range_style = "--low: $__low%; --high: $__high%";

		wc_store(
			array(
				'state' => array(
					'filters' => array(
						'minPrice'    => $min_price,
						'maxPrice'    => $max_price,
						'maxRange'    => $max_range,
						'rangeStyle'  => $range_style,
						'isMinActive' => true,
						'isMaxActive' => false,
					),
				),
			)
		);

		return <<<HTML
		<div $wrapper_attributes data-wc-interactive>
			<h3>Filter by price</h3>
			<div
				class='range'
				style='$range_style'
				data-wc-bind--style='state.filters.rangeStyle'
				data-wc-on--mousemove='actions.filters.updateActiveHandle'
			>
				<div class='range-bar'></div>
				<input
					type='range'
					min='0'
					max='$max_range'
					value='$min_price'
					class='active'
					data-wc-bind--max='state.filters.maxRange'
					data-wc-bind--value='state.filters.minPrice'
					data-wc-class--active='state.filters.isMinActive'
					data-wc-on--input='actions.filters.setMinPrice'
					data-wc-on--change='actions.filters.updateProducts'
				>
				<input
					type='range'
					min='0'
					max='$max_range'
					value='$max_price'
					data-wc-bind--max='state.filters.maxRange'
					data-wc-bind--value='state.filters.maxPrice'
					data-wc-class--active='state.filters.isMaxActive'
					data-wc-on--input='actions.filters.setMaxPrice'
					data-wc-on--change='actions.filters.updateProducts'
				>
			</div>
			<div class='text'>
				<input
					type='text'
					value='$min_price'
					data-wc-bind--value='state.filters.minPrice'
					data-wc-on--input='actions.filters.setMinPrice'
					data-wc-on--change='actions.filters.updateProducts'
				>
				<input
					type='text'
					value='$max_price'
					data-wc-bind--value='state.filters.maxPrice'
					data-wc-on--input='actions.filters.setMaxPrice'
					data-wc-on--change='actions.filters.updateProducts'
				>
			</div>
			<button data-wc-on--click='actions.filters.reset'>Reset</button>
		</div>
HTML;
	}
}
