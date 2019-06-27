<?php
/**
 * Hand-picked Products block.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * HandpickedProducts class.
 */
class HandpickedProducts extends AbstractProductGrid {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'handpicked-products';

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		$ids = array_map( 'absint', $this->attributes['products'] );

		$query_args['post__in']       = $ids;
		$query_args['posts_per_page'] = count( $ids );
	}

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes() {
		return array(
			'align'             => self::get_schema_align(),
			'alignButtons'      => self::get_schema_boolean( false ),
			'columns'           => self::get_schema_number( wc_get_theme_support( 'product_blocks::default_columns', 3 ) ),
			'editMode'          => self::get_schema_boolean( true ),
			'orderby'           => self::get_schema_orderby(),
			'products'          => self::get_schema_list_ids(),
			'contentVisibility' => self::get_schema_content_visibility(),
		);
	}
}
