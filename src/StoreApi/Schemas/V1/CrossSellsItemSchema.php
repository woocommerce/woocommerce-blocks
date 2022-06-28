<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;

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
			'key'               => $properties['key'],
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
	 * Converts a WooCommerce product id into an object suitable for the response.
	 *
	 * @param integer $product_id Cross-sell product id.
	 *
	 * @return array
	 * @throws RouteException When unable to find cross-sells product by id.
	 */
	public function get_item_response( $product_id ) {
		$product = wc_get_product( $product_id );

		if ( ! $product instanceof \WC_Product || 0 === $product->get_id() ) {
			throw new RouteException(
				'woocommerce_rest_product_invalid_id',
				__( 'Invalid product ID for cross-sells block.', 'woo-gutenberg-products-block' ),
				500
			);
		}

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
