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
		error_log( print_r($block->context, true) );
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
			foreach ( $tags->get_attribute_names_with_prefix( 'data-wc-bind--' ) as $attribute_name ) {
				$attribute_value  = str_replace( 'state.filters.', '', $tags->get_attribute( $attribute_name ) );
				$target_attribute = str_replace( 'data-wc-bind--', '', $attribute_name );
				if ( in_array( $attribute_value, array_keys( $data ), true ) ) {
					$tags->set_attribute( $target_attribute, $data[ $attribute_value ] );
				}
			}
		}

		return $tags->get_updated_html();
	}
}
