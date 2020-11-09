<?php
namespace Automattic\WooCommerce\Blocks\StoreApi;

use Exception;
use Schemas\AbstractSchema;

/**
 * SchemaController class.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class SchemaController {

	/**
	 * Stores schema class instances.
	 *
	 * @var AbstractSchema[]
	 */
	protected $schemas = [];

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->initialize();
	}

	/**
	 * Get a schema class instance.
	 *
	 * @throws Exception If the schema does not exist.
	 *
	 * @param string $name Name of schema.
	 * @return AbstractSchema
	 */
	public function get( $name ) {
		if ( ! isset( $this->schemas[ $name ] ) ) {
			throw new Exception( $name . ' schema does not exist' );
		}
		return $this->schemas[ $name ];
	}

	/**
	 * Load schema class instances.
	 */
	protected function initialize() {
		$this->schemas = [
			Schemas\CartSchema::IDENTIFIER             => new Schemas\CartSchema(
				new Schemas\CartItemSchema(
					new Schemas\ImageAttachmentSchema()
				),
				new Schemas\CartCouponSchema(),
				new Schemas\CartShippingRateSchema(),
				new Schemas\ShippingAddressSchema(),
				new Schemas\ErrorSchema()
			),
			Schemas\CartCouponSchema::IDENTIFIER       => new Schemas\CartCouponSchema(),
			Schemas\CartItemSchema::IDENTIFIER         => new Schemas\CartItemSchema(
				new Schemas\ImageAttachmentSchema()
			),
			Schemas\CheckoutSchema::IDENTIFIER         => new Schemas\CheckoutSchema(
				new Schemas\BillingAddressSchema(),
				new Schemas\ShippingAddressSchema()
			),
			Schemas\ProductSchema::IDENTIFIER          => new Schemas\ProductSchema(
				new Schemas\ImageAttachmentSchema()
			),
			Schemas\ProductAttributeSchema::IDENTIFIER => new Schemas\ProductAttributeSchema(),
			Schemas\ProductCategorySchema::IDENTIFIER  => new Schemas\ProductCategorySchema(
				new Schemas\ImageAttachmentSchema()
			),
			Schemas\ProductCollectionDataSchema::IDENTIFIER => new Schemas\ProductCollectionDataSchema(),
			Schemas\ProductReviewSchema::IDENTIFIER    => new Schemas\ProductReviewSchema(
				new Schemas\ImageAttachmentSchema()
			),
			Schemas\TermSchema::IDENTIFIER             => new Schemas\TermSchema(),
		];
	}
}
