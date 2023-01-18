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
	protected $block_name = 'simple-price-filter';
	const MIN_PRICE_QUERY_VAR = 'min_price';
	const MAX_PRICE_QUERY_VAR = 'max_price';

	/**
	 * Render function.
	 */
	public function render( $attributes = [], $content = '', $block = null ) {
		$wrapper_attributes = get_block_wrapper_attributes();
		$max_range = 90; // TODO: get this value from DB.
		$min_price = get_query_var( self::MIN_PRICE_QUERY_VAR, 0 );
		$max_price = get_query_var( self::MAX_PRICE_QUERY_VAR, $max_range );

		// CSS variables for the range bar style.
		$__low = 100 * $min_price / $max_range;
		$__high = 100 * $max_price / $max_range;
		$range_style = "--low: $__low%; --high: $__high%";

		return "
		<div $wrapper_attributes>
			<div
				class='range'
				style='$range_style'
				wp-bind:style='derived.filters.rangeStyle'
				wp-on:mousemove='actions.filters.updateActiveHandle'
			>
				<div class='range-bar'></div>
				<input
					class='active'
					type='range'
					value='$min_price'
					min='0'
					max='$max_range'
					wp-bind:value='state.filters.minPrice'
					wp-class:active='state.filters.isMinActive'
					wp-on:input='actions.filters.setMinPrice'
					wp-on:change='actions.filters.updateProducts'
				>
				<input
					class=''
					type='range'
					value='$max_price'
					min='0'
					max='$max_range'
					wp-bind:value='state.filters.maxPrice'
					wp-class:active='state.filters.isMaxActive'
					wp-on:input='actions.filters.setMaxPrice'
					wp-on:change='actions.filters.updateProducts'
				>
			</div>
			<div>
				<input
					type='text'
					value='$min_price'
					wp-bind:value='state.filters.minPrice'
					wp-on:input='actions.filters.setMinPrice'
					wp-on:change='actions.filters.updateProducts'
				>
				<input
					type='text'
					value='$max_price'
					wp-bind:value='state.filters.maxPrice'
					wp-on:input='actions.filters.setMaxPrice'
					wp-on:change='actions.filters.updateProducts'
				>
			</div>
			<button wp-on:click='actions.filters.reset'>Reset</button>
		</div>
		";
	}

	/**
	 * Block type script definition.
	 */
	public function get_block_type_script( $key = null ) {
		$script = [
			'handle'       => 'simple-price-filter-view',
			'path'         => 'build/wp-directives-simple-price-filter.js',
			'dependencies' => [ 'wp-directives-runtime' ],
		];
		return $key ? $script[ $key ] : $script;
	}
}
