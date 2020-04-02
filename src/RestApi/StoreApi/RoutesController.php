<?php
/**
 * Register Routes.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi;

defined( 'ABSPATH' ) || exit;

use Routes\AbstractRoute;

/**
 * RoutesController class.
 */
class RoutesController {

	/**
	 * Stores schemas.
	 *
	 * @var SchemaController
	 */
	protected $schemas;

	/**
	 * Stores routes.
	 *
	 * @var AbstractRoute[]
	 */
	protected $routes = [];

	/**
	 * Constructor.
	 *
	 * @param SchemaController $schemas Schema controller class passed to each route.
	 */
	public function __construct( SchemaController $schemas ) {
		$this->schemas = $schemas;
		$this->initialize();
	}

	/**
	 * Register defined list of routes with WordPress.
	 */
	public function register_routes() {
		foreach ( $this->routes as $route ) {
			register_rest_route(
				$route->get_namespace(),
				$route->get_path(),
				$route->get_args()
			);
		}
	}

	/**
	 * Load route class instances.
	 */
	protected function initialize() {
		$this->routes = [
			new Routes\Cart( $this->schemas->get( 'cart' ) ),
			new Routes\CartAddItem( $this->schemas->get( 'cart' ) ),
			new Routes\CartApplyCoupon( $this->schemas->get( 'cart' ) ),
			new Routes\CartCoupons( $this->schemas->get( 'cart-coupon' ) ),
			new Routes\CartCouponsByCode( $this->schemas->get( 'cart-coupon' ) ),
			new Routes\CartItems( $this->schemas->get( 'cart-item' ) ),
			new Routes\CartItemsByKey( $this->schemas->get( 'cart-item' ) ),
			new Routes\CartRemoveCoupon( $this->schemas->get( 'cart' ) ),
			new Routes\CartRemoveItem( $this->schemas->get( 'cart' ) ),
			new Routes\CartSelectShippingRate( $this->schemas->get( 'cart' ) ),
			new Routes\CartUpdateItem( $this->schemas->get( 'cart' ) ),
			new Routes\CartUpdateShipping( $this->schemas->get( 'cart' ) ),
			new Routes\Checkout( $this->schemas->get( 'checkout' ) ),
			new Routes\ProductAttributes( $this->schemas->get( 'product-attribute' ) ),
			new Routes\ProductAttributesById( $this->schemas->get( 'product-attribute' ) ),
			new Routes\ProductAttributeTerms( $this->schemas->get( 'term' ) ),
			new Routes\ProductCollectionData( $this->schemas->get( 'product-collection-data' ) ),
			new Routes\Products( $this->schemas->get( 'product' ) ),
			new Routes\ProductsById( $this->schemas->get( 'product' ) ),
		];
	}
}
