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

		$min_range = 0; // This value should come from DB.
		$max_range = 90; // This value should come from DB.
		$min_price = get_query_var( self::MIN_PRICE_QUERY_VAR, 0 );
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
	}
}
