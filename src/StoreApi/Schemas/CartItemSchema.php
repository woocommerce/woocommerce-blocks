<?php
/**
 * Abstract Schema.
 *
 * Rest API schema class.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\Utilities\ProductImages;

/**
 * AbstractBlock class.
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
			'key'        => array(
				'description' => __( 'Unique identifier for the item within the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'id'         => array(
				'description' => __( 'ID of the product or variation this cart item represents.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => array( 'view', 'edit' ),
				'required'    => true,
				'readonly'    => true,
				'arg_options' => array(
					'sanitize_callback' => 'absint',
					'validate_callback' => array( $this, 'product_id_exists' ),
				),
			),
			'quantity'   => array(
				'description' => __( 'Quantity of this item in the cart.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => array( 'view', 'edit' ),
				'required'    => true,
				'arg_options' => array(
					'sanitize_callback' => 'wc_stock_amount',
				),
			),
			'name'       => array(
				'description' => __( 'Product name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit', 'embed' ),
				'readonly'    => true,
			),
			'sku'        => array(
				'description' => __( 'Stock keeping unit, if applicable.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'permalink'  => array(
				'description' => __( 'Product URL.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'uri',
				'context'     => array( 'view', 'edit', 'embed' ),
				'readonly'    => true,
			),
			'images'     => array(
				'description' => __( 'List of images.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => array( 'view', 'edit', 'embed' ),
				'readonly'    => true,
				'items'       => array(
					'type'       => 'object',
					'properties' => array(
						'id'   => array(
							'description' => __( 'Image ID.', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => array( 'view', 'edit' ),
							'readonly'    => true,
						),
						'src'  => array(
							'description' => __( 'Image URL.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'format'      => 'uri',
							'context'     => array( 'view', 'edit' ),
							'readonly'    => true,
						),
						'name' => array(
							'description' => __( 'Image name.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => array( 'view', 'edit' ),
							'readonly'    => true,
						),
						'alt'  => array(
							'description' => __( 'Image alternative text.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => array( 'view', 'edit' ),
							'readonly'    => true,
						),
					),
				),
			),
			'price'      => array(
				'description' => __( 'Current product price.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'line_price' => array(
				'description' => __( 'Current line price.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'variation'  => array(
				'description' => __( 'If this cart item represents a variation, chosen attributes are shown here.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
				'items'       => array(
					'type'       => 'object',
					'properties' => array(
						'attribute' => array(
							'description' => __( 'Variation attribute.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => array( 'view', 'edit' ),
						),
						'value'     => array(
							'description' => __( 'Attribute value.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => array( 'view', 'edit' ),
						),
					),
				),
			),
		];
	}

	/**
	 * Check given ID exists,
	 *
	 * @param integer $param Product ID.
	 * @return bool
	 */
	public function product_id_exists( $param ) {
		$post = get_post( (int) $param );
		return $post && in_array( $post->post_type, [ 'product', 'product_variation' ], true );
	}

	/**
	 * Convert a woo cart item to an object suitable for the response.
	 *
	 * @param array $cart_item Cart item array.
	 * @return array
	 */
	public function get_item_response( $cart_item ) {
		$product          = $cart_item['data'];
		$chosen_variation = [];

		if ( $cart_item['variation'] ) {
			foreach ( $cart_item['variation'] as $key => $value ) {
				$chosen_variation[] = [
					'attribute' => $key,
					'value'     => $value,
				];
			}
		}

		return [
			'key'        => $cart_item['key'],
			'id'         => $product->get_id(),
			'quantity'   => wc_stock_amount( $cart_item['quantity'] ),
			'name'       => $product->get_title(),
			'sku'        => $product->get_sku(),
			'permalink'  => $product->get_permalink(),
			'images'     => ( new ProductImages() )->images_to_array( $product ),
			'price'      => wc_format_decimal( $product->get_price(), wc_get_price_decimals() ),
			'line_price' => wc_format_decimal( isset( $cart_item['line_total'] ) ? $cart_item['line_total'] : $product->get_price() * wc_stock_amount( $cart_item['quantity'] ), wc_get_price_decimals() ),
			'variation'  => $chosen_variation,
		];
	}
}
