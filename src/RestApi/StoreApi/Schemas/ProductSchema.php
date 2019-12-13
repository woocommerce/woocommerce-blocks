<?php
/**
 * Product Schema.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\Utilities\ProductImages;

/**
 * ProductSchema class.
 *
 * @since 2.5.0
 */
class ProductSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'product';

	/**
	 * Product schema properties.
	 *
	 * @return array
	 */
	protected function get_properties() {
		return [
			'id'                  => array(
				'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'name'                => array(
				'description' => __( 'Product name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
			),
			'variation'           => array(
				'description' => __( 'Product variation attributes, if applicable.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
			),
			'permalink'           => array(
				'description' => __( 'Product URL.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'uri',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'description'         => array(
				'description' => __( 'Short description or excerpt from description.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
			),
			'on_sale'             => array(
				'description' => __( 'Is the product on sale?', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'sku'                 => array(
				'description' => __( 'Unique identifier.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
			),
			'prices'              => array(
				'description' => __( 'Price data.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
				'properties'  => array(
					'currency_code'               => [
						'description' => __( 'Currency code (in ISO format).', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'currency_symbol'             => [
						'description' => __( 'Symbol for this currency that should be used to format prices.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'currency_minor_unit'         => [
						'description' => __( 'Currency minor unit (number of digits after the decimal separator) used for cart item prices.', 'woo-gutenberg-products-block' ),
						'type'        => 'integer',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'currency_decimal_separator'  => array(
						'description' => __( 'Decimal separator for this currency that should be used to format prices.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
					),
					'currency_thousand_separator' => array(
						'description' => __( 'Thousand separator for this currency that should be used to format prices.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
					),
					'currency_prefix'             => array(
						'description' => __( 'Price prefix for this currency that should be used to format prices.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
					),
					'currency_suffix'             => array(
						'description' => __( 'Price prefix for this currency that should be used to format prices.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
					),
					'price'                       => array(
						'description' => __( 'Current product price.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
					),
					'regular_price'               => array(
						'description' => __( 'Regular product price', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
					),
					'sale_price'                  => array(
						'description' => __( 'Sale product price, if applicable.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
					),
					'price_range'                 => array(
						'description' => __( 'Price range, if applicable.', 'woo-gutenberg-products-block' ),
						'type'        => 'object',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
						'properties'  => array(
							'min_amount' => array(
								'description' => __( 'Price amount.', 'woo-gutenberg-products-block' ),
								'type'        => 'string',
								'context'     => array( 'view', 'edit' ),
								'readonly'    => true,
							),
							'max_amount' => array(
								'description' => __( 'Price amount.', 'woo-gutenberg-products-block' ),
								'type'        => 'string',
								'context'     => array( 'view', 'edit' ),
								'readonly'    => true,
							),
						),
					),
				),
			),
			'average_rating'      => array(
				'description' => __( 'Reviews average rating.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'review_count'        => array(
				'description' => __( 'Amount of reviews that the product has.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'images'              => array(
				'description' => __( 'List of images.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => array( 'view', 'edit' ),
				'items'       => array(
					'type'       => 'object',
					'properties' => array(
						'id'   => array(
							'description' => __( 'Image ID.', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => array( 'view', 'edit' ),
						),
						'src'  => array(
							'description' => __( 'Image URL.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'format'      => 'uri',
							'context'     => array( 'view', 'edit' ),
						),
						'name' => array(
							'description' => __( 'Image name.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => array( 'view', 'edit' ),
						),
						'alt'  => array(
							'description' => __( 'Image alternative text.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => array( 'view', 'edit' ),
						),
					),
				),
			),
			'has_options'         => array(
				'description' => __( 'Does the product have options?', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'is_purchasable'      => array(
				'description' => __( 'Is the product purchasable?', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'is_in_stock'         => array(
				'description' => __( 'Is the product in stock?', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'low_stock_remaining' => array(
				'description' => __( 'Quantity left in stock if stock is low, or null if not applicable.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
			),
			'add_to_cart'         => array(
				'description' => __( 'Add to cart button parameters.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'readonly'    => true,
				'properties'  => array(
					'text'        => array(
						'description' => __( 'Button text.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
					),
					'description' => array(
						'description' => __( 'Button description.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
						'readonly'    => true,
					),
				),
			),
		];
	}

	/**
	 * Convert a WooCommerce product into an object suitable for the response.
	 *
	 * @param \WC_Product $product Product instance.
	 * @return array
	 */
	public function get_item_response( \WC_Product $product ) {
		return [
			'id'                  => $product->get_id(),
			'name'                => $product->get_title(),
			'variation'           => $product->is_type( 'variation' ) ? wc_get_formatted_variation( $product, true, true, false ) : '',
			'permalink'           => $product->get_permalink(),
			'sku'                 => $product->get_sku(),
			'description'         => apply_filters( 'woocommerce_short_description', $product->get_short_description() ? $product->get_short_description() : wc_trim_string( $product->get_description(), 400 ) ),
			'on_sale'             => $product->is_on_sale(),
			'prices'              => $this->get_prices( $product ),
			'average_rating'      => $product->get_average_rating(),
			'review_count'        => $product->get_review_count(),
			'images'              => ( new ProductImages() )->images_to_array( $product ),
			'has_options'         => $product->has_options(),
			'is_purchasable'      => $product->is_purchasable(),
			'is_in_stock'         => $product->is_in_stock(),
			'low_stock_remaining' => $this->get_low_stock_remaining( $product ),
			'add_to_cart'         => [
				'text'        => $product->add_to_cart_text(),
				'description' => $product->add_to_cart_description(),
			],
		];
	}

	/**
	 * If a product has low stock, return the remaining stock amount for display.
	 *
	 * @param \WC_Product $product Product instance.
	 * @return integer|null
	 */
	protected function get_low_stock_remaining( \WC_Product $product ) {
		if ( ! is_null( $product->get_stock_quantity() ) && $product->get_stock_quantity() <= wc_get_low_stock_amount( $product ) ) {
			return $product->get_stock_quantity();
		}
		return null;
	}

	/**
	 * Get an array of pricing data.
	 *
	 * @param \WC_Product $product Product instance.
	 * @return array
	 */
	protected function get_prices( \WC_Product $product ) {
		$prices                  = $this->get_store_currency_response();
		$tax_display_mode        = get_option( 'woocommerce_tax_display_shop' );
		$price_function          = 'incl' === $tax_display_mode ? 'wc_get_price_including_tax' : 'wc_get_price_excluding_tax';
		$prices['price']         = $this->prepare_money_response( $price_function( $product ), wc_get_price_decimals() );
		$prices['regular_price'] = $this->prepare_money_response( $price_function( $product, [ 'price' => $product->get_regular_price() ] ), wc_get_price_decimals() );
		$prices['sale_price']    = $this->prepare_money_response( $price_function( $product, [ 'price' => $product->get_sale_price() ] ), wc_get_price_decimals() );
		$prices['price_range']   = $this->get_price_range( $product );

		return $prices;
	}

	/**
	 * Get price range from certain product types.
	 *
	 * @param \WC_Product $product Product instance.
	 * @return array|null
	 */
	protected function get_price_range( \WC_Product $product ) {
		$tax_display_mode = get_option( 'woocommerce_tax_display_shop' );
		$price_function   = 'incl' === $tax_display_mode ? 'wc_get_price_including_tax' : 'wc_get_price_excluding_tax';

		if ( $product->is_type( 'variable' ) ) {
			$prices = $product->get_variation_prices( true );

			if ( min( $prices['price'] ) !== max( $prices['price'] ) ) {
				return [
					'min_amount' => $this->prepare_money_response( $price_function( $product, [ 'price' => min( $prices['price'] ) ] ), wc_get_price_decimals() ),
					'max_amount' => $this->prepare_money_response( $price_function( $product, [ 'price' => max( $prices['price'] ) ] ), wc_get_price_decimals() ),
				];
			}
		}

		if ( $product->is_type( 'grouped' ) ) {
			$children = array_filter( array_map( 'wc_get_product', $product->get_children() ), 'wc_products_array_filter_visible_grouped' );

			foreach ( $children as $child ) {
				if ( '' !== $child->get_price() ) {
					$child_prices[] = $price_function( $child );
				}
			}

			if ( ! empty( $child_prices ) ) {
				return [
					'min_amount' => $this->prepare_money_response( min( $child_prices ), wc_get_price_decimals() ),
					'max_amount' => $this->prepare_money_response( max( $child_prices ), wc_get_price_decimals() ),
				];
			}
		}

		return null;
	}
}
