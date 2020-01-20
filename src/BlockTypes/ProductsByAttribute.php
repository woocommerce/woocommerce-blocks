<?php
/**
 * Products by attribute block.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * ProductsByAttribute class.
 */
class ProductsByAttribute extends AbstractProductGrid {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'products-by-attribute';

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		if ( ! empty( $this->attributes['attributes'] ) ) {
			$taxonomy = sanitize_title( $this->attributes['attributes'][0]['attr_slug'] );
			$terms    = wp_list_pluck( $this->attributes['attributes'], 'id' );

			$query_args['tax_query'][] = array(
				'taxonomy' => $taxonomy,
				'terms'    => array_map( 'absint', $terms ),
				'field'    => 'term_id',
				'operator' => 'all' === $this->attributes['attrOperator'] ? 'AND' : 'IN',
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
				'attributes'   => [
					'type'    => 'array',
					'items'   => [
						'type'       => 'object',
						'properties' => [
							'id'        => [
								'type' => 'number',
							],
							'attr_slug' => [
								'type' => 'string',
							],
						],
					],
					'default' => [],
				],
				'attrOperator' => [
					'type'    => 'string',
					'default' => 'any',
				],
				'editMode'     => $this->get_schema_boolean( true ),
				'orderby'      => $this->get_schema_orderby(),
			]
		);
	}
}
