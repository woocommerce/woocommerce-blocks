<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use stdClass;

/**
 * CollectionPriceFilter class.
 */
final class CollectionPriceFilter extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name     = 'collection-price-filter';
	const MIN_PRICE_QUERY_VAR = 'min_price';
	const MAX_PRICE_QUERY_VAR = 'max_price';

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content    Block content.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		list ( 'showInputFields' => $show_input_fields, 'inlineInput' => $inline_input ) = $attributes;

		// This should be available in $block->context['collectionData']['price_range'].
		$price_range                              = new stdClass();
		$price_range->min_price                   = 0;
		$price_range->max_price                   = 25000;
		$price_range->currency_code               = 'USD';
		$price_range->currency_symbol             = '$';
		$price_range->currency_minor_unit         = 3;
		$price_range->currency_decimal_separator  = ',';
		$price_range->currency_thousand_separator = '.';
		$price_range->currency_prefix             = '$';
		$price_range->currency_suffix             = '';

		$wrapper_attributes  = get_block_wrapper_attributes();
		$min_range           = $price_range->min_price / 10 ** $price_range->currency_minor_unit;
		$max_range           = $price_range->max_price / 10 ** $price_range->currency_minor_unit;
		$min_price           = intval( get_query_var( self::MIN_PRICE_QUERY_VAR, $min_range ) );
		$max_price           = intval( get_query_var( self::MAX_PRICE_QUERY_VAR, $max_range ) );
		$formatted_min_price = wc_price( $min_price, array( 'decimals' => 0 ) );
		$formatted_max_price = wc_price( $max_price, array( 'decimals' => 0 ) );

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

		$price_min = $show_input_fields ? <<<HTML
			<input
				type='text'
				value='$min_price'
				data-wc-bind--value='state.filters.minPrice'
				data-wc-on--input='actions.filters.setMinPrice'
				data-wc-on--change='actions.filters.updateProducts'
			>
		HTML : <<<HTML
			<span data-wc-text="state.filters.formattedMinPrice">$formatted_min_price</span>
		HTML;

		$price_max = $show_input_fields ? <<<HTML
			<input
				type='text'
				value='$max_price'
				data-wc-bind--value='state.filters.maxPrice'
				data-wc-on--input='actions.filters.setmaxPrice'
				data-wc-on--change='actions.filters.updateProducts'
			>
		HTML : <<<HTML
			<span data-wc-text="state.filters.formattedMaxPrice">$formatted_max_price</span>
		HTML;

		$price_range = <<<HTML
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
		HTML;

		if ( $show_input_fields & $inline_input ) {
			return <<<HTML
			<div $wrapper_attributes>
				<div class='text'>
					$price_min
					$price_range
					$price_max
				</div>
				<button data-wc-on--click='actions.filters.reset'>Reset</button>
			</div>
			HTML;
		}

		return <<<HTML
		<div $wrapper_attributes>
			$price_range
			<div class='text'>
				$price_min
				$price_max
			</div>
			<button data-wc-on--click='actions.filters.reset'>Reset</button>
		</div>
HTML;
	}
}
