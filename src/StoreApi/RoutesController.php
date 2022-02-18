<?php
namespace Automattic\WooCommerce\Blocks\StoreApi;

use Automattic\WooCommerce\Blocks\StoreApi\SchemaController;
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
	 * @var array
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
	 * Each route class is instantized with the SchemaController instance, and it's main Schema Type.
	 *
	 * @throws \Exception If the schema does not exist.
	 * @param string $name Name of schema.
	 * @param int    $version API Version being requested.
	 * @return AbstractRoute
	 */
	public function get( $name, $version = 1 ) {
		$route = $this->routes[ "v${version}" ][ $name ] ?? false;

		if ( ! $route ) {
			throw new \Exception( "${name} v{$version} route does not exist" );
		}

		return new $route(
			$this->schemas,
			$this->schemas->get( $route::SCHEMA_TYPE, $route::SCHEMA_VERSION )
		);
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
		$route_identifiers = array_keys( $this->routes[ "v${version}" ] );
		foreach ( $route_identifiers as $route ) {
			$route_instance  = $this->get( $route, $version );
			$route_namespace = $namespace ?: $route_instance->get_namespace();

			register_rest_route(
				$route_namespace,
				$route_instance->get_path(),
				$route_instance->get_args()
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
		$this->routes = [
			'v1' => [
				Routes\V1\Batch::IDENTIFIER              => Routes\V1\Batch::class,
				Routes\V1\Cart::IDENTIFIER               => Routes\V1\Cart::class,
				Routes\V1\CartAddItem::IDENTIFIER        => Routes\V1\CartAddItem::class,
				Routes\V1\CartApplyCoupon::IDENTIFIER    => Routes\V1\CartApplyCoupon::class,
				Routes\V1\CartCoupons::IDENTIFIER        => Routes\V1\CartCoupons::class,
				Routes\V1\CartCouponsByCode::IDENTIFIER  => Routes\V1\CartCouponsByCode::class,
				Routes\V1\CartExtensions::IDENTIFIER     => Routes\V1\CartExtensions::class,
				Routes\V1\CartItems::IDENTIFIER          => Routes\V1\CartItems::class,
				Routes\V1\CartItemsByKey::IDENTIFIER     => Routes\V1\CartItemsByKey::class,
				Routes\V1\CartRemoveCoupon::IDENTIFIER   => Routes\V1\CartRemoveCoupon::class,
				Routes\V1\CartRemoveItem::IDENTIFIER     => Routes\V1\CartRemoveItem::class,
				Routes\V1\CartSelectShippingRate::IDENTIFIER => Routes\V1\CartSelectShippingRate::class,
				Routes\V1\CartUpdateItem::IDENTIFIER     => Routes\V1\CartUpdateItem::class,
				Routes\V1\CartUpdateCustomer::IDENTIFIER => Routes\V1\CartUpdateCustomer::class,
				Routes\V1\Checkout::IDENTIFIER           => Routes\V1\Checkout::class,
				Routes\V1\ProductAttributes::IDENTIFIER  => Routes\V1\ProductAttributes::class,
				Routes\V1\ProductAttributesById::IDENTIFIER => Routes\V1\ProductAttributesById::class,
				Routes\V1\ProductAttributeTerms::IDENTIFIER => Routes\V1\ProductAttributeTerms::class,
				Routes\V1\ProductCategories::IDENTIFIER  => Routes\V1\ProductCategories::class,
				Routes\V1\ProductCategoriesById::IDENTIFIER => Routes\V1\ProductCategoriesById::class,
				Routes\V1\ProductCollectionData::IDENTIFIER => Routes\V1\ProductCollectionData::class,
				Routes\V1\ProductReviews::IDENTIFIER     => Routes\V1\ProductReviews::class,
				Routes\V1\ProductTags::IDENTIFIER        => Routes\V1\ProductTags::class,
				Routes\V1\Products::IDENTIFIER           => Routes\V1\Products::class,
				Routes\V1\ProductsById::IDENTIFIER       => Routes\V1\ProductsById::class,
			],
		];
	}
}
