<?php
/**
 * On-sale products block.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * ProductOnSale class.
 */
class ProductOnSale extends AbstractProductGrid {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-on-sale';

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		$query_args['post__in'] = array_merge( array( 0 ), wc_get_product_ids_on_sale() );
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
				'sale_price'     => 16,
				'rating_counts'  => 1,
				'average_rating' => 5,
				'image'          => plugins_url( 'assets/js/previews/images/cap-2.jpg', dirname( __DIR__ ) ),
			),
			(object) array(
				'name'           => 'Beanie',
				'featured'       => true,
				'price'          => 22,
				'regular_price'  => 22,
				'sale_price'     => 20,
				'rating_counts'  => 1,
				'average_rating' => 4,
				'image'          => plugins_url( 'assets/js/previews/images/beanie-2.jpg', dirname( __DIR__ ) ),
			),
			(object) array(
				'name'           => 'WordPress Pennant',
				'featured'       => false,
				'price'          => 10,
				'regular_price'  => 10,
				'sale_price'     => 8,
				'rating_counts'  => 0,
				'average_rating' => 0,
				'image'          => plugins_url( 'assets/js/previews/images/pennant-1.jpg', dirname( __DIR__ ) ),
			),
		);
		return $preview_products[ $index - 1 ];
	}

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes() {
		return array_merge(
			parent::get_attributes(),
			array(
				'className' => $this->get_schema_string(),
				'orderby'   => $this->get_schema_orderby(),
			)
		);
	}
}
