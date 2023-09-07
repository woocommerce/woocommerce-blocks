<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * CollectionPriceFilter class.
 */
class CollectionPriceFilter extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name     = 'collection-price-filter';
	const MIN_PRICE_QUERY_VAR = 'min_price';
	const MAX_PRICE_QUERY_VAR = 'max_price';

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_data( array $attributes = [] ) {
		parent::enqueue_data( $attributes );

		if ( is_admin() ) {
			$this->asset_data_registry->add( 'priceFilterOutputTemplate', $this->get_block_output_template() );
		}
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
		$wrapper_attributes = get_block_wrapper_attributes();
		$min_range          = 0; // This value should come from DB.
		$max_range          = 90; // This value should come from DB.
		$min_price          = get_query_var( self::MIN_PRICE_QUERY_VAR, $min_range );
		$max_price          = get_query_var( self::MAX_PRICE_QUERY_VAR, $max_range );

		// CSS variables for the range bar style.
		$__low       = 100 * $min_price / $max_range;
		$__high      = 100 * $max_price / $max_range;
		$range_style = "--low: $__low%; --high: $__high%";

		$data = array(
			'minPrice'    => $min_price,
			'maxPrice'    => $max_price,
			'minRange'    => $min_range,
			'maxRange'    => $max_range,
			'rangeStyle'  => $range_style,
			'isMinActive' => true,
			'isMaxActive' => false,
		);

		wc_store(
			array(
				'state' => array(
					'filters' => $data,
				),
			)
		);

		$injected_output = ( new \Mustache_Engine() )->render( $this->get_block_output_template(), $data );

		return <<<HTML
			<div $wrapper_attributes>
				$injected_output
			</div>
		HTML;
	}

	/**
	 * Get the block output mustache template.
	 *
	 * @return string
	 */
	public function get_block_output_template() {
		return <<<HTML
		<div
			class="range"
			style="{{ rangeStyle }}"
			data-wc-bind--style="state.filters.rangeStyle"
			data-wc-on--mousemove="actions.filters.updateActiveHandle"
		>
			<div class="range-bar"></div>
			<input
				type="range"
				min="{{ minRange }}"
				max="{{ maxRange }}"
				value="{{ minPrice }}"
				class="active"
				data-wc-bind--max="state.filters.maxRange"
				data-wc-bind--value="state.filters.minPrice"
				data-wc-class--active="state.filters.isMinActive"
				data-wc-on--input="actions.filters.setMinPrice"
				data-wc-on--change="actions.filters.updateProducts"
			/>
			<input
				type="range"
				min="{{ minRange }}"
				max="{{ maxRange }}"
				value="{{ maxPrice }}"
				data-wc-bind--max="state.filters.maxRange"
				data-wc-bind--value="state.filters.maxPrice"
				data-wc-class--active="state.filters.isMaxActive"
				data-wc-on--input="actions.filters.setMaxPrice"
				data-wc-on--change="actions.filters.updateProducts"
			/>
		</div>
		<div class="text">
			{{#showInputFields}}
				<input
					type="text"
					value="{{ minPrice }}"
					data-wc-bind--value="state.filters.minPrice"
					data-wc-on--input="actions.filters.setMinPrice"
					data-wc-on--change="actions.filters.updateProducts"
				/>
				<input
					type="text"
					value="{{ maxPrice }}"
					data-wc-bind--value="state.filters.maxPrice"
					data-wc-on--input="actions.filters.setmaxPrice"
					data-wc-on--change="actions.filters.updateProducts"
				/>
			{{/showInputFields}}
			{{^showInputFields}}
				<span data-wc-text="state.filters.minPrice">{{ minPrice }}</span>
				<span data-wc-text="state.filters.maxPrice">{{ maxPrice }}</span>
			{{/showInputFields}}
		</div>
		HTML;
	}
}
