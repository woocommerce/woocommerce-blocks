<?php
/**
 * Top rated products block.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * ProductTopRated class.
 */
class ProductTopRated extends AbstractProductGrid {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-top-rated';

	/**
	 * Force orderby to rating.
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		$query_args['orderby'] = 'rating';
	}

	/**
	 * Gets product example data.
	 *
	 * @param int|string $index Index of the preview product to retrieve (starting at 1).
	 * @return object Data of the preview product.
	 */
	protected function get_preview_product( $index ) {
		$preview_products = array(
			(object) array(
				'name'           => 'Cap',
				'featured'       => false,
				'price'          => 18,
				'regular_price'  => 18,
				'sale_price'     => 18,
				'rating_counts'  => 1,
				'average_rating' => 5,
				'image'          => plugins_url( 'assets/js/previews/images/cap-2.jpg', dirname( __DIR__ ) ),
			),
			(object) array(
				'name'           => 'WordPress Pennant',
				'featured'       => false,
				'price'          => 10,
				'regular_price'  => 10,
				'sale_price'     => 8,
				'rating_counts'  => 1,
				'average_rating' => 5,
				'image'          => plugins_url( 'assets/js/previews/images/pennant-1.jpg', dirname( __DIR__ ) ),
			),
			(object) array(
				'name'           => 'Beanie',
				'featured'       => true,
				'price'          => 22,
				'regular_price'  => 22,
				'sale_price'     => 22,
				'rating_counts'  => 1,
				'average_rating' => 4,
				'image'          => plugins_url( 'assets/js/previews/images/beanie-2.jpg', dirname( __DIR__ ) ),
			),
		);
		return $preview_products[ $index - 1 ];
	}
}
