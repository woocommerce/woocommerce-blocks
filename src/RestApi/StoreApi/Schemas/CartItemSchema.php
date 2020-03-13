<?php
/**
 * Cart Item Schema.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\Utilities\ProductImages;
use Automattic\WooCommerce\Blocks\RestApi\Utilities\ProductSummary;

/**
 * CartItemSchema class.
 *
 * @since 2.5.0
 */
class CartItemSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'cart_item';

	/**
	 * We use product schema for line item price info.
	 *
	 * @var ProductSchema
	 */
	protected $product_schema;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->product_schema = new ProductSchema();
	}

	/**
	 * Cart schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'key'                 => [
				'description' => __( 'Unique identifier for the item within the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'id'                  => [
				'description' => __( 'The cart item product or variation ID.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'arg_options' => [
					'sanitize_callback' => 'absint',
					'validate_callback' => [ $this, 'product_id_exists' ],
				],
			],
			'quantity'            => [
				'description' => __( 'Quantity of this item in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'arg_options' => [
					'sanitize_callback' => 'wc_stock_amount',
				],
			],
			'name'                => [
				'description' => __( 'Product name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'summary'             => [
				'description' => __( 'A short summary (or excerpt from the full description) for the product in HTML format.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'short_description'   => [
				'description' => __( 'Product short description in HTML format.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'description'         => [
				'description' => __( 'Product full description in HTML format.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'sku'                 => [
				'description' => __( 'Stock keeping unit, if applicable.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'low_stock_remaining' => [
				'description' => __( 'Quantity left in stock if stock is low, or null if not applicable.', 'woo-gutenberg-products-block' ),
				'type'        => [ 'integer', 'null' ],
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'backorders_allowed'  => [
				'description' => __( 'True if backorders are allowed past stock availability.', 'woo-gutenberg-products-block' ),
				'type'        => [ 'boolean' ],
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'sold_individually'   => [
				'description' => __( 'If true, only one item of this product is allowed for purchase in a single order.', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'permalink'           => [
				'description' => __( 'Product URL.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'uri',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'images'              => [
				'description' => __( 'List of images.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'id'        => [
							'description' => __( 'Image ID.', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => [ 'view', 'edit' ],
						],
						'src'       => [
							'description' => __( 'Full size image URL.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'format'      => 'uri',
							'context'     => [ 'view', 'edit' ],
						],
						'thumbnail' => [
							'description' => __( 'Thumbnail URL.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'format'      => 'uri',
							'context'     => [ 'view', 'edit' ],
						],
						'srcset'    => [
							'description' => __( 'Thumbnail srcset for responsive images.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
						],
						'sizes'     => [
							'description' => __( 'Thumbnail sizes for responsive images.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
						],
						'name'      => [
							'description' => __( 'Image name.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
						],
						'alt'       => [
							'description' => __( 'Image alternative text.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
						],
					],
				],
			],
			'variation'           => [
				'description' => __( 'Chosen attributes (for variations).', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'attribute' => [
							'description' => __( 'Variation attribute name.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
						],
						'value'     => [
							'description' => __( 'Variation attribute value.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
						],
					],
				],
			],
			'prices'              => [
				'description' => __( 'Price data for the product in the current line item, including or excluding taxes based on the "display prices during cart and checkout" setting. Provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => array_merge(
					$this->get_store_currency_properties(),
					[
						'price'         => [
							'description' => __( 'Current product price.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'regular_price' => [
							'description' => __( 'Regular product price', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'sale_price'    => [
							'description' => __( 'Sale product price, if applicable.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'price_range'   => [
							'description' => __( 'Price range, if applicable.', 'woo-gutenberg-products-block' ),
							'type'        => [ 'object', 'null' ],
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
							'properties'  => [
								'min_amount' => [
									'description' => __( 'Price amount.', 'woo-gutenberg-products-block' ),
									'type'        => 'string',
									'context'     => [ 'view', 'edit' ],
									'readonly'    => true,
								],
								'max_amount' => [
									'description' => __( 'Price amount.', 'woo-gutenberg-products-block' ),
									'type'        => 'string',
									'context'     => [ 'view', 'edit' ],
									'readonly'    => true,
								],
							],
						],
					]
				),
			],
			'totals'              => [
				'description' => __( 'Item total amounts provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => array_merge(
					$this->get_store_currency_properties(),
					[
						'line_subtotal'     => [
							'description' => __( 'Line subtotal (the price of the product before coupon discounts have been applied).', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'line_subtotal_tax' => [
							'description' => __( 'Line subtotal tax.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'line_total'        => [
							'description' => __( 'Line total (the price of the product after coupon discounts have been applied).', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'line_total_tax'    => [
							'description' => __( 'Line total tax.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					]
				),
			],
		];
	}

	/**
	 * Check given ID exists,
	 *
	 * @param integer $product_id Product ID.
	 * @return bool
	 */
	public function product_id_exists( $product_id ) {
		$post = get_post( (int) $product_id );
		return $post && in_array( $post->post_type, [ 'product', 'product_variation' ], true );
	}

	/**
	 * Convert a WooCommerce cart item to an object suitable for the response.
	 *
	 * @param array $cart_item Cart item array.
	 * @return array
	 */
	public function get_item_response( $cart_item ) {
		$product = $cart_item['data'];

		$product_prices = $this->product_schema->get_prices( $product, get_option( 'woocommerce_tax_display_cart' ) );

		return [
			'key'                 => $cart_item['key'],
			'id'                  => $product->get_id(),
			'quantity'            => wc_stock_amount( $cart_item['quantity'] ),
			'name'                => $this->prepare_html_response( $product->get_title() ),
			'summary'             => $this->prepare_html_response( ( new ProductSummary( $product ) )->get_summary( 150 ) ),
			'short_description'   => $this->prepare_html_response( wc_format_content( $product->get_short_description() ) ),
			'description'         => $this->prepare_html_response( wc_format_content( $product->get_description() ) ),
			'sku'                 => $this->prepare_html_response( $product->get_sku() ),
			'low_stock_remaining' => $this->get_low_stock_remaining( $product ),
			'backorders_allowed'  => (bool) $product->backorders_allowed(),
			'sold_individually'   => $product->is_sold_individually(),
			'permalink'           => $product->get_permalink(),
			'images'              => ( new ProductImages() )->images_to_array( $product ),
			'variation'           => $this->format_variation_data( $cart_item['variation'], $product ),
			'prices'              => (object) $product_prices,
			'totals'              => (object) array_merge(
				$this->get_store_currency_response(),
				[
					'line_subtotal'     => $this->prepare_money_response( $cart_item['line_subtotal'], wc_get_price_decimals() ),
					'line_subtotal_tax' => $this->prepare_money_response( $cart_item['line_subtotal_tax'], wc_get_price_decimals() ),
					'line_total'        => $this->prepare_money_response( $cart_item['line_total'], wc_get_price_decimals() ),
					'line_total_tax'    => $this->prepare_money_response( $cart_item['line_tax'], wc_get_price_decimals() ),
				]
			),
		];
	}

	/**
	 * Returns the remaining stock for a product if it has stock.
	 *
	 * This also factors in draft orders.
	 *
	 * @param \WC_Product $product Product instance.
	 * @return integer|null
	 */
	protected function get_remaining_stock( \WC_Product $product ) {
		if ( is_null( $product->get_stock_quantity() ) ) {
			return null;
		}

		$draft_order = WC()->session->get( 'store_api_draft_order' );

		// @todo Remove once min support for WC reaches 4.0.0.
		if ( \class_exists( '\Automattic\WooCommerce\Checkout\Helpers\ReserveStock' ) ) {
			$reserve_stock = new \Automattic\WooCommerce\Checkout\Helpers\ReserveStock();
		} else {
			$reserve_stock = new \Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\ReserveStock();
		}

		$reserved_stock = $reserve_stock->get_reserved_stock( $product, isset( $draft_order['id'] ) ? $draft_order['id'] : 0 );
		return $product->get_stock_quantity() - $reserved_stock;
	}

	/**
	 * If a product has low stock, return the remaining stock amount for display.
	 *
	 * Note; unlike the products API, this also factors in draft orders so the results are more up to date.
	 *
	 * @param \WC_Product $product Product instance.
	 * @return integer|null
	 */
	protected function get_low_stock_remaining( \WC_Product $product ) {
		$remaining_stock = $this->get_remaining_stock( $product );

		if (
			null !== $remaining_stock
			&& $remaining_stock <= wc_get_low_stock_amount( $product )
		) {
			return $remaining_stock;
		}

		return null;
	}

	/**
	 * Format variation data, for example convert slugs such as attribute_pa_size to Size.
	 *
	 * @param array       $variation_data Array of data from the cart.
	 * @param \WC_Product $product Product data.
	 * @return array
	 */
	protected function format_variation_data( $variation_data, $product ) {
		$return = [];

		foreach ( $variation_data as $key => $value ) {
			$taxonomy = wc_attribute_taxonomy_name( str_replace( 'attribute_pa_', '', urldecode( $key ) ) );

			if ( taxonomy_exists( $taxonomy ) ) {
				// If this is a term slug, get the term's nice name.
				$term = get_term_by( 'slug', $value, $taxonomy );
				if ( ! is_wp_error( $term ) && $term && $term->name ) {
					$value = $term->name;
				}
				$label = wc_attribute_label( $taxonomy );
			} else {
				// If this is a custom option slug, get the options name.
				$value = apply_filters( 'woocommerce_variation_option_name', $value, null, $taxonomy, $product );
				$label = wc_attribute_label( str_replace( 'attribute_', '', $key ), $product );
			}

			$return[] = [
				'attribute' => $this->prepare_html_response( $label ),
				'value'     => $this->prepare_html_response( $value ),
			];
		}

		return $return;
	}
}
