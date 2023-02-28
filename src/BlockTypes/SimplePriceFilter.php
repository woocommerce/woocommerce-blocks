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
		$max_range          = 90; // TODO: get this value from DB.
		$min_price          = get_query_var( self::MIN_PRICE_QUERY_VAR, 0 );
		$max_price          = get_query_var( self::MAX_PRICE_QUERY_VAR, $max_range );

		// CSS variables for the range bar style.
		// TODO: Use style directive instead when available.
		$__low       = 100 * $min_price / $max_range;
		$__high      = 100 * $max_price / $max_range;
		$range_style = "--low: $__low%; --high: $__high%";

		woo_directives_store(
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

		return "
		<div $wrapper_attributes>
			<h3>Filter by price</h3>
			<div
				class='range'
				data-woo-bind:style='state.filters.rangeStyle'
				data-woo-on:mousemove='actions.filters.updateActiveHandle'
			>
				<div class='range-bar'></div>
				<input
					type='range'
					min='0'
					data-woo-bind:max='state.filters.maxRange'
					data-woo-bind:value='state.filters.minPrice'
					data-woo-class:active='state.filters.isMinActive'
					data-woo-on:input='actions.filters.setMinPrice'
					data-woo-on:change='actions.filters.updateProducts'
				>
				<input
					type='range'
					min='0'
					data-woo-bind:max='state.filters.maxRange'
					data-woo-bind:value='state.filters.maxPrice'
					data-woo-class:active='state.filters.isMaxActive'
					data-woo-on:input='actions.filters.setMaxPrice'
					data-woo-on:change='actions.filters.updateProducts'
				>
			</div>
			<div class='text'>
				<input
					type='text'
					data-woo-bind:value='state.filters.minPrice'
					data-woo-on:input='actions.filters.setMinPrice'
					data-woo-on:change='actions.filters.updateProducts'
				>
				<input
					type='text'
					data-woo-bind:value='state.filters.maxPrice'
					data-woo-on:input='actions.filters.setMaxPrice'
					data-woo-on:change='actions.filters.updateProducts'
				>
			</div>
			<button data-woo-on:click='actions.filters.reset'>Reset</button>
		</div>
		";
	}

	/**
	 * Get the frontend script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 *
	 * @return null
	 */
	public function get_block_type_script( $key = null ) {
		$script = [
			'handle'       => 'simple-price-filter-view',
			'path'         => 'build/woo-directives-simple-price-filter.js',
			'dependencies' => [ 'woo-directives-runtime' ],
		];
		return $key ? $script[ $key ] : $script;
	}
}
