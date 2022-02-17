<?php
namespace Automattic\WooCommerce\Blocks\StoreApi;

use Automattic\WooCommerce\Blocks\StoreApi\Utilities\CartController;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\OrderController;
use Exception;
use Routes\AbstractRoute;

/**
 * RoutesController class.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
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
	 * Get a route class instance.
	 *
	 * @throws \Exception If the schema does not exist.
	 *
	 * @param string $name Name of schema.
	 * @param int    $version API Version being requested.
	 * @return AbstractRoute
	 */
	public function get( $name, $version = 1 ) {
		if ( ! isset( $this->routes[ "v${version}" ], $this->routes[ "v${version}" ][ $name ] ) ) {
			throw new \Exception( "${name} v{$version} route does not exist" );
		}
		return $this->routes[ "v${version}" ][ $name ];
	}

	/**
	 * Register defined list of routes with WordPress.
	 *
	 * @param int    $version API Version being requested.
	 * @param string $namespace Overrides the route namespace.
	 */
	public function register_routes( $version = 1, $namespace = '' ) {
		if ( ! isset( $this->routes[ "v${version}" ] ) ) {
			return;
		}
		foreach ( $this->routes[ "v${version}" ] as $route ) {
			register_rest_route(
				$namespace ? $namespace : $route->get_namespace(),
				$route->get_path(),
				$route->get_args()
			);
		}
	}

	/**
	 * Get the requested version of the Store API from the route request.
	 *
	 * @return int
	 */
	protected function get_route_version() {
		preg_match( '/\/v(?P<version>\d)\//', untrailingslashit( $GLOBALS['wp']->query_vars['rest_route'] ), $matches );

		return (int) $matches['version'] ?? 1;
	}

	/**
	 * Load route class instances.
	 */
	protected function initialize() {
		$cart_controller  = new CartController();
		$order_controller = new OrderController();

		$this->routes = [
			'v1' => [
				'batch'                     => new Routes\Batch(),
				'cart'                      => new Routes\Cart( $this->schemas->get( 'cart' ), null, $cart_controller, $order_controller ),
				'cart-add-item'             => new Routes\CartAddItem( $this->schemas->get( 'cart' ), null, $cart_controller, $order_controller ),
				'cart-apply-coupon'         => new Routes\CartApplyCoupon( $this->schemas->get( 'cart' ), null, $cart_controller, $order_controller ),
				'cart-coupons'              => new Routes\CartCoupons( $this->schemas->get( 'cart' ), $this->schemas->get( 'cart-coupon' ), $cart_controller, $order_controller ),
				'cart-coupons-by-code'      => new Routes\CartCouponsByCode( $this->schemas->get( 'cart' ), $this->schemas->get( 'cart-coupon' ), $cart_controller, $order_controller ),
				'cart-extensions'           => new Routes\CartExtensions( $this->schemas->get( 'cart' ), $this->schemas->get( 'cart-extensions' ), $cart_controller, $order_controller ),
				'cart-items'                => new Routes\CartItems( $this->schemas->get( 'cart' ), $this->schemas->get( 'cart-item' ), $cart_controller, $order_controller ),
				'cart-items-by-key'         => new Routes\CartItemsByKey( $this->schemas->get( 'cart' ), $this->schemas->get( 'cart-item' ), $cart_controller, $order_controller ),
				'cart-remove-coupon'        => new Routes\CartRemoveCoupon( $this->schemas->get( 'cart' ), null, $cart_controller, $order_controller ),
				'cart-remove-item'          => new Routes\CartRemoveItem( $this->schemas->get( 'cart' ), null, $cart_controller, $order_controller ),
				'cart-select-shipping-rate' => new Routes\CartSelectShippingRate( $this->schemas->get( 'cart' ), null, $cart_controller, $order_controller ),
				'cart-update-item'          => new Routes\CartUpdateItem( $this->schemas->get( 'cart' ), null, $cart_controller, $order_controller ),
				'cart-update-customer'      => new Routes\CartUpdateCustomer( $this->schemas->get( 'cart' ), null, $cart_controller, $order_controller ),
				'checkout'                  => new Routes\Checkout( $this->schemas->get( 'cart' ), $this->schemas->get( 'checkout' ), $cart_controller, $order_controller ),
				'product-attributes'        => new Routes\ProductAttributes( $this->schemas->get( 'product-attribute' ) ),
				'product-attributes-by-id'  => new Routes\ProductAttributesById( $this->schemas->get( 'product-attribute' ) ),
				'product-attribute-terms'   => new Routes\ProductAttributeTerms( $this->schemas->get( 'term' ) ),
				'product-categories'        => new Routes\ProductCategories( $this->schemas->get( 'product-category' ) ),
				'product-categories-by-id'  => new Routes\ProductCategoriesById( $this->schemas->get( 'product-category' ) ),
				'product-collection-data'   => new Routes\ProductCollectionData( $this->schemas->get( 'product-collection-data' ) ),
				'product-reviews'           => new Routes\ProductReviews( $this->schemas->get( 'product-review' ) ),
				'product-tags'              => new Routes\ProductTags( $this->schemas->get( 'term' ) ),
				'products'                  => new Routes\Products( $this->schemas->get( 'product' ) ),
				'products-by-id'            => new Routes\ProductsById( $this->schemas->get( 'product' ) ),
			],
		];
	}
}
