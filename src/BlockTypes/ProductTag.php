<?php
/**
 * Product tag block.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * ProductTag class.
 */
class ProductTag extends AbstractProductGrid {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-tag';

	/**
	 * Set args specific to this block.
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		if ( ! empty( $this->attributes['tags'] ) ) {
			$query_args['tax_query'][] = array(
				'taxonomy' => 'product_tag',
				'terms'    => array_map( 'absint', $this->attributes['tags'] ),
				'field'    => 'id',
				'operator' => isset( $this->attributes['tagOperator'] ) && 'any' === $this->attributes['tagOperator'] ? 'IN' : 'AND',
			);
		}
	}

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes() {
		$attributes = parent::get_attributes();

		unset( $attributes['categories'], $attributes['catOperator'] );

		return array_merge(
			$attributes,
			[
				'orderby'     => $this->get_schema_orderby(),
				'tagOperator' => array(
					'type'    => 'string',
					'default' => 'any',
				),
				'tags'        => $this->get_schema_list_ids(),
			]
		);
	}
}
