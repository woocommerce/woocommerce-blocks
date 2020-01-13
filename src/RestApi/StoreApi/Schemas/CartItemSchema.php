<?php
/**
 * Cart Item Schema.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\Utilities\ProductImages;

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
	 * Cart schema properties.
	 *
	 * @return array
	 */
	protected function get_properties() {
		return [
			'key'               => [
				'description' => __( 'Unique identifier for the item within the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'id'                => [
				'description' => __( 'The cart item product or variation ID.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
				'arg_options' => [
					'sanitize_callback' => 'absint',
					'validate_callback' => [ $this, 'product_id_exists' ],
				],
			],
			'quantity'          => [
				'description' => __( 'Quantity of this item in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
				'arg_options' => [
					'sanitize_callback' => 'wc_stock_amount',
				],
			],
			'name'              => [
				'description' => __( 'Product name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'short_description' => [
				'description' => __( 'Product short description or excerpt from full description.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'sku'               => [
				'description' => __( 'Stock keeping unit, if applicable.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'permalink'         => [
				'description' => __( 'Product URL.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'uri',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'images'            => [
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
			'variation'         => [
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
			'totals'            => [
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
	 * @param array $cart_item Cart item array.
	 * @return array
	 */
	public function get_item_response( $cart_item ) {
		$product = $cart_item['data'];

		$description_char_limit = 75;

		$short_description = $product->get_short_description() ? $product->get_short_description() : wc_trim_string( $product->get_description(), $description_char_limit );
		$short_description = wp_filter_nohtml_kses( $short_description );
		$short_description = strip_shortcodes( $short_description );
		$short_description = normalize_whitespace( $short_description );

		return [
			'key'               => $cart_item['key'],
			'id'                => $product->get_id(),
			'quantity'          => wc_stock_amount( $cart_item['quantity'] ),
			'name'              => $product->get_title(),
			'short_description' => $short_description,
			'sku'               => $product->get_sku(),
			'permalink'         => $product->get_permalink(),
			'images'            => ( new ProductImages() )->images_to_array( $product ),
			'variation'         => $this->format_variation_data( $cart_item['variation'], $product ),
			'totals'            => array_merge(
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
				$label = wc_attribute_label( str_replace( 'attribute_', '', $name ), $product );
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
