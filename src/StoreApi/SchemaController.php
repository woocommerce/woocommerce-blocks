<?php
namespace Automattic\WooCommerce\Blocks\StoreApi;

use Automattic\WooCommerce\Blocks\Domain\Services\ExtendRestApi;

/**
 * SchemaController class.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class SchemaController {

	/**
	 * Stores schema class instances.
	 *
	 * @var Schemas\AbstractSchema[]
	 */
	protected $schemas = [];

	/**
	 * Stores Rest Extending instance
	 *
	 * @var ExtendRestApi
	 */
	private $extend;

	/**
	 * Constructor.
	 *
	 * @param ExtendRestApi $extend Rest Extending instance.
	 */
	public function __construct( ExtendRestApi $extend ) {
		$this->extend = $extend;
		$this->initialize();
	}

	/**
	 * Get a schema class instance.
	 *
	 * @throws \Exception If the schema does not exist.
	 *
	 * @param string $name Name of schema.
	 * @param int    $version API Version being requested.
	 * @return Schemas\AbstractSchema A new instance of the requested schema.
	 */
	public function get( $name, $version = 1 ) {
		if ( ! isset( $this->schemas[ "v${version}" ], $this->schemas[ "v${version}" ][ $name ] ) ) {
			throw new \Exception( "${name} v{$version} schema does not exist" );
		}

		$schema_class = $this->schemas[ "v${version}" ][ $name ];

		/**
		 * Initialize each schema with the extend API and the SchemaController.
		 */
		return new $schema_class( $this->extend, $this );
	}

	/**
	 * Initialize the list of available schemas.
	 */
	protected function initialize() {
		$this->schemas = [
			'v1' => [
				Schemas\ErrorSchema::IDENTIFIER            => Schemas\ErrorSchema::class,
				Schemas\ImageAttachmentSchema::IDENTIFIER  => Schemas\ImageAttachmentSchema::class,
				Schemas\TermSchema::IDENTIFIER             => Schemas\TermSchema::class,
				Schemas\BillingAddressSchema::IDENTIFIER   => Schemas\BillingAddressSchema::class,
				Schemas\ShippingAddressSchema::IDENTIFIER  => Schemas\ShippingAddressSchema::class,
				Schemas\CartShippingRateSchema::IDENTIFIER => Schemas\CartShippingRateSchema::class,
				Schemas\CartShippingRateSchema::IDENTIFIER => Schemas\CartShippingRateSchema::class,
				Schemas\CartCouponSchema::IDENTIFIER       => Schemas\CartCouponSchema::class,
				Schemas\CartFeeSchema::IDENTIFIER          => Schemas\CartFeeSchema::class,
				Schemas\CartItemSchema::IDENTIFIER         => Schemas\CartItemSchema::class,
				Schemas\CartSchema::IDENTIFIER             => Schemas\CartSchema::class,
				Schemas\CartExtensionsSchema::IDENTIFIER   => Schemas\CartExtensionsSchema::class,
				Schemas\CheckoutSchema::IDENTIFIER         => Schemas\CheckoutSchema::class,
				Schemas\ProductSchema::IDENTIFIER          => Schemas\ProductSchema::class,
				Schemas\ProductAttributeSchema::IDENTIFIER => Schemas\ProductAttributeSchema::class,
				Schemas\ProductCategorySchema::IDENTIFIER  => Schemas\ProductCategorySchema::class,
				Schemas\ProductCollectionDataSchema::IDENTIFIER => Schemas\ProductCollectionDataSchema::class,
				Schemas\ProductReviewSchema::IDENTIFIER    => Schemas\ProductReviewSchema::class,
			],
		];
	}
}
