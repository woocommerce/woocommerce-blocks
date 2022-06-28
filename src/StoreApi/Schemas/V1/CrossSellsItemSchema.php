<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

/**
 * CrossSellsItemSchema class.
 */
class CrossSellsItemSchema extends ProductSchema {

	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'cart_cross_sells_item';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'cart-cross-sells-item';

	/**
	 * Cross-sells schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		$properties = parent::get_properties();

		return [
			'id'                => $properties['id'],
			'name'              => $properties['name'],
			'permalink'         => $properties['permalink'],
			'prices'            => $properties['prices'],
			'images'            => $properties['images'],
			'average_rating'    => $properties['average_rating'],
			self::EXTENDING_KEY => $this->get_extended_schema( self::IDENTIFIER ),
		];
	}

	/**
	 * Converts a WooCommerce product into an object suitable for the response.
	 *
	 * @param \WC_Product $product Cross-sell product.
	 *
	 * @return array
	 */
	public function get_item_response( $product ) {

		return [
			'id'                => $product->get_id(),
			'name'              => $this->prepare_html_response( $product->get_title() ),
			'permalink'         => $product->get_permalink(),
			'prices'            => (object) $this->prepare_product_price_response( $product ),
			'average_rating'    => (string) $product->get_average_rating(),
			'images'            => $this->get_images( $product ),
			self::EXTENDING_KEY => $this->get_extended_data( self::IDENTIFIER ),
		];
	}

}
