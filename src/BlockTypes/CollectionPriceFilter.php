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
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content    Block content.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		$min_range = 0; // This value should come from DB.
		$max_range = 90; // This value should come from DB.
		$min_price = get_query_var( self::MIN_PRICE_QUERY_VAR, $min_range );
		$max_price = get_query_var( self::MAX_PRICE_QUERY_VAR, $max_range );

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

		// Inject the dynamic data into the block.
		$tags = new \WP_HTML_Tag_Processor( $content );

		// Loop through all the tags and update the attributes.
		while ( $tags->next_tag() ) {
			if ( $tags->get_attribute( 'data-wc-bind--style' ) === 'state.filters.rangeStyle' ) {
				$tags->set_attribute( 'style', $range_style );
			}

			if ( $tags->get_attribute( 'type' ) === 'range' ) {
				$tags->set_attribute( 'min', $min_range );
				$tags->set_attribute( 'max', $max_range );
			}

			if ( $tags->get_attribute( 'data-wc-on--input' ) === 'actions.filters.setMinPrice' ) {
				$tags->set_attribute( 'value', $min_price );
			}

			if ( $tags->get_attribute( 'data-wc-on--input' ) === 'actions.filters.setMaxPrice' ) {
				$tags->set_attribute( 'value', $max_price );
			}
		}

		return $tags->get_updated_html();
	}
}
