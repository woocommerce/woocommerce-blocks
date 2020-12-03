<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Schemas;

/**
 * ProductCollectionDataSchema class.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @since 2.5.0
 */
class ProductCollectionDataSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'product-collection-data';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'product-collection-data';

	/**
	 * Product collection data schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'price_range'      => [
				'description' => __( 'Min and max prices found in collection of products, provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
				'type'        => [ 'object', 'null' ],
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => array_merge(
					$this->get_store_currency_properties(),
					[
						'min_price' => [
							'description' => __( 'Min price found in collection of products.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'max_price' => [
							'description' => __( 'Max price found in collection of products.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					]
				),
			],
			'attribute_counts' => [
				'description' => __( 'Returns number of products within attribute terms.', 'woo-gutenberg-products-block' ),
				'type'        => [ 'array', 'null' ],
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'term'  => [
							'description' => __( 'Term ID', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'count' => [
							'description' => __( 'Number of products.', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					],
				],
			],
			'rating_counts'    => [
				'description' => __( 'Returns number of products with each average rating.', 'woo-gutenberg-products-block' ),
				'type'        => [ 'array', 'null' ],
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'rating' => [
							'description' => __( 'Average rating', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'count'  => [
							'description' => __( 'Number of products.', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					],
				],
			],
		];
	}

	/**
	 * Format data.
	 *
	 * @param array $data Collection data to format and return.
	 * @return array
	 */
	public function get_item_response( $data ) {
		return [
			'price_range'      => ! is_null( $data['min_price'] ) && ! is_null( $data['max_price'] ) ? (object) $this->prepare_currency_response(
				[
					'min_price' => $this->prepare_money_response( $data['min_price'], wc_get_price_decimals() ),
					'max_price' => $this->prepare_money_response( $data['max_price'], wc_get_price_decimals() ),
				]
			) : null,
			'attribute_counts' => $data['attribute_counts'],
			'rating_counts'    => $data['rating_counts'],
		];
	}
}
