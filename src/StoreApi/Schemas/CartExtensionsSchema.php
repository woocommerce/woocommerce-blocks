<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Schemas;

/**
 * Class CartExtensionsSchema
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class CartExtensionsSchema extends CartSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'cart-extensions';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'cart-extensions';

	/**
	 * Handle the request and return a valid response for this endpoint.
	 *
	 * @param \WC_Cart         $cart Cart controller.
	 * @param \WP_REST_Request $request Request containing data for the extension callback.
	 *
	 * @return array
	 */
	public function get_item_response( $cart, $request = null ) {
		$callback = $this->extend->get_update_callback( self::IDENTIFIER, $request['namespace'] );
		$callback( $request['data'] );
		return parent::get_item_response( $cart );
	}
}
