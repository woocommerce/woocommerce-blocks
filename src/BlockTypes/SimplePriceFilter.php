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

	/**
	 * Render function.
	 */
	public function render( $attributes = [], $content = '', $block = null ) {
		$wrapper_attributes = get_block_wrapper_attributes();
		return "<div $wrapper_attributes>
			<label>Min price: <input type='text' wp-on:change='actions.filters.setMinPrice' wp-bind:value='state.filters.minPrice'></label>
			<label>Max price: <input type='text' wp-on:change='actions.filters.setMaxPrice' wp-bind:value='state.filters.maxPrice'></label>
		</div>";
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
