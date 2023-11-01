<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

/**
 * OrderSchema class.
 */
class PatternsSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'patterns';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'patterns';

	/**
	 * Patterns schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [];
	}

	/**
	 * Get the Patterns response.
	 *
	 * @param array $item Item to get response for.
	 *
	 * @return array
	 */
	public function get_item_response( $item ) {
		return [
			'ai_content_generated'     => true,
			'product_content'          => $item['product_content'],
			'dummy_products_to_update' => $item['dummy_products_to_update'],
		];
	}
}
