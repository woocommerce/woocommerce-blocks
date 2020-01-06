<?php
/**
 * Order Item Schema.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\Utilities\ProductImages;

/**
 * OrderItemSchema class.
 */
class OrderItemSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'order_item';

	/**
	 * Cart schema properties.
	 *
	 * @return array
	 */
	protected function get_properties() {
		return [
			'id'        => [
				'description' => __( 'The item product or variation ID.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
				'arg_options' => [
					'sanitize_callback' => 'absint',
					'validate_callback' => [ $this, 'product_id_exists' ],
				],
			],
			'quantity'  => [
				'description' => __( 'Quantity of this item in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
				'arg_options' => [
					'sanitize_callback' => 'wc_stock_amount',
				],
			],
			'name'      => [
				'description' => __( 'Product name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'sku'       => [
				'description' => __( 'Stock keeping unit, if applicable.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'permalink' => [
				'description' => __( 'Product URL.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'uri',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'images'    => [
				'description' => __( 'List of images.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'id'   => [
							'description' => __( 'Image ID.', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'src'  => [
							'description' => __( 'Image URL.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'format'      => 'uri',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'name' => [
							'description' => __( 'Image name.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'alt'  => [
							'description' => __( 'Image alternative text.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					],
				],
			],
			'variation' => [
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
			'totals'    => [
				'description' => __( 'Item total amounts provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => array_merge(
					$this->get_store_currency_properties(),
					[
						'line_subtotal'     => [
							'description' => __( 'Line price subtotal (excluding coupons and discounts).', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'line_subtotal_tax' => [
							'description' => __( 'Line price subtotal tax.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'line_total'        => [
							'description' => __( 'Line price total (including coupons and discounts).', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'line_total_tax'    => [
							'description' => __( 'Line price total tax.', 'woo-gutenberg-products-block' ),
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
	 * @todo Variation is stored to meta - how can we gather for response?
	 *
	 * @param \WC_Order_Item_Product $line_item Order line item array.
	 * @return array
	 */
	public function get_item_response( $line_item ) {
		$product = $line_item->get_product();

		return [
			'id'        => $line_item->get_variation_id() ? $line_item->get_variation_id() : $line_item->get_product_id(),
			'quantity'  => $line_item->get_quantity(),
			'name'      => $product ? $product->get_title() : null,
			'sku'       => $product ? $product->get_sku() : null,
			'permalink' => $product ? $product->get_permalink() : null,
			'images'    => $product ? ( new ProductImages() )->images_to_array( $product ) : null,
			'variation' => $this->format_variation_data( $line_item, $product ),
			'totals'    => array_merge(
				$this->get_store_currency_response(),
				[
					'line_subtotal'     => $this->prepare_money_response( $line_item->get_subtotal(), wc_get_price_decimals() ),
					'line_subtotal_tax' => $this->prepare_money_response( $line_item->get_subtotal_tax(), wc_get_price_decimals() ),
					'line_total'        => $this->prepare_money_response( $line_item->get_total(), wc_get_price_decimals() ),
					'line_total_tax'    => $this->prepare_money_response( $line_item->get_total_tax(), wc_get_price_decimals() ),
				]
			),
		];
	}

	/**
	 * Format variation data. For line items we get meta data and format it.
	 *
	 * @param \WC_Order_Item_Product $line_item Line item from the order.
	 * @param \WC_Product            $product Product data.
	 * @return array
	 */
	protected function format_variation_data( $line_item, $product ) {
		$return         = [];
		$line_item_meta = $line_item->get_meta_data();
		$attribute_keys = array_keys( $product->get_attributes() );

		foreach ( $line_item_meta as $meta ) {
			$key   = $meta->key;
			$value = $meta->value;

			if ( ! in_array( $key, $attribute_keys, true ) ) {
				continue;
			}

			$taxonomy = wc_attribute_taxonomy_name( str_replace( 'pa_', '', urldecode( $key ) ) );

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
				$label = wc_attribute_label( $name, $product );
			}

			$return[ $label ] = $value;
		}

		return $return;
	}

	/**
	 * Get product attribute taxonomy name.
	 *
	 * @param string      $slug   Taxonomy name.
	 * @param \WC_Product $object Product data.
	 * @return string
	 */
	protected function get_attribute_taxonomy_name( $slug, $object ) {
		// Format slug so it matches attributes of the product.
		$slug       = wc_attribute_taxonomy_slug( $slug );
		$attributes = $object->get_attributes();
		$attribute  = false;

		// pa_ attributes.
		if ( isset( $attributes[ wc_attribute_taxonomy_name( $slug ) ] ) ) {
			$attribute = $attributes[ wc_attribute_taxonomy_name( $slug ) ];
		} elseif ( isset( $attributes[ $slug ] ) ) {
			$attribute = $attributes[ $slug ];
		}

		if ( ! $attribute ) {
			return $slug;
		}

		// Taxonomy attribute name.
		if ( $attribute->is_taxonomy() ) {
			$taxonomy = $attribute->get_taxonomy_object();
			return $taxonomy->attribute_label;
		}

		// Custom product attribute name.
		return $attribute->get_name();
	}
}
