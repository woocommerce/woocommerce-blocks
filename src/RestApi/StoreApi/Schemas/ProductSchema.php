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
			'id'                  => [
				'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'name'                => [
				'description' => __( 'Product name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'variation'           => [
				'description' => __( 'Product variation attributes, if applicable.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'permalink'           => [
				'description' => __( 'Product URL.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'uri',
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
			'on_sale'             => [
				'description' => __( 'Is the product on sale?', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'sku'                 => [
				'description' => __( 'Unique identifier.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'prices'              => [
				'description' => __( 'Price data provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
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
			'average_rating'      => [
				'description' => __( 'Reviews average rating.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'review_count'        => [
				'description' => __( 'Amount of reviews that the product has.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'images'              => [
				'description' => __( 'List of images.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
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
			'has_options'         => [
				'description' => __( 'Does the product have options?', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'is_purchasable'      => [
				'description' => __( 'Is the product purchasable?', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'is_in_stock'         => [
				'description' => __( 'Is the product in stock?', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'low_stock_remaining' => [
				'description' => __( 'Quantity left in stock if stock is low, or null if not applicable.', 'woo-gutenberg-products-block' ),
				'type'        => [ 'integer', 'null' ],
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'add_to_cart'         => [
				'description' => __( 'Add to cart button parameters.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => [
					'text'        => [
						'description' => __( 'Button text.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
					'description' => [
						'description' => __( 'Button description.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
						'readonly'    => true,
					],
				],
			],
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
			'name'                => $this->prepare_html_response( $product->get_title() ),
			'variation'           => $this->prepare_html_response( $product->is_type( 'variation' ) ? wc_get_formatted_variation( $product, true, true, false ) : '' ),
			'permalink'           => $product->get_permalink(),
			'sku'                 => $this->prepare_html_response( $product->get_sku() ),
			'summary'             => $this->prepare_html_response( $this->get_product_summary( $product ) ),
			'short_description'   => $this->prepare_html_response( wc_format_content( $product->get_short_description() ) ),
			'description'         => $this->prepare_html_response( wc_format_content( $product->get_description() ) ),
			'on_sale'             => $product->is_on_sale(),
			'prices'              => (object) $this->get_prices( $product ),
			'average_rating'      => $product->get_average_rating(),
			'review_count'        => $product->get_review_count(),
			'images'              => ( new ProductImages() )->images_to_array( $product ),
			'has_options'         => $product->has_options(),
			'is_purchasable'      => $product->is_purchasable(),
			'is_in_stock'         => $product->is_in_stock(),
			'low_stock_remaining' => $this->get_low_stock_remaining( $product ),
			'add_to_cart'         => (object) $this->prepare_html_response(
				[
					'text'        => $product->add_to_cart_text(),
					'description' => $product->add_to_cart_description(),
				]
			),
		];
	}

	/**
	 * Generate a summary from the product short/full description.
	 *
	 * @param \WC_Product $product Product instance.
	 * @return string
	 */
	protected function get_product_summary( \WC_Product $product ) {
		$short_description = $product->get_short_description();

		if ( $short_description ) {
			return \wc_format_content( $short_description );
		}

		$description = $product->get_description();
		$length      = \strlen( \wp_strip_all_tags( $description ) );

		// Try to extract the first sentence only if the description is too long.
		if ( 150 < $length ) {
			$description_p = \wpautop( $description );
			$description   = \strstr( $description_p, '</p>' ) ? \substr( $description_p, 0, \strpos( $description_p, '</p>' ) + 4 ) : \wc_trim_string( $description, 150 );
		}

		return \wc_format_content( $description );
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
	 * @return object|null
	 */
	protected function get_price_range( \WC_Product $product ) {
		$tax_display_mode = get_option( 'woocommerce_tax_display_shop' );

		if ( $product->is_type( 'variable' ) ) {
			$prices = $product->get_variation_prices( true );

			if ( min( $prices['price'] ) !== max( $prices['price'] ) ) {
				return (object) [
					'min_amount' => $this->prepare_money_response( min( $prices['price'] ), wc_get_price_decimals() ),
					'max_amount' => $this->prepare_money_response( max( $prices['price'] ), wc_get_price_decimals() ),
				];
			}
		}

		if ( $product->is_type( 'grouped' ) ) {
			$children       = array_filter( array_map( 'wc_get_product', $product->get_children() ), 'wc_products_array_filter_visible_grouped' );
			$price_function = 'incl' === $tax_display_mode ? 'wc_get_price_including_tax' : 'wc_get_price_excluding_tax';

			foreach ( $children as $child ) {
				if ( '' !== $child->get_price() ) {
					$child_prices[] = $price_function( $child );
				}
			}

			if ( ! empty( $child_prices ) ) {
				return (object) [
					'min_amount' => $this->prepare_money_response( min( $child_prices ), wc_get_price_decimals() ),
					'max_amount' => $this->prepare_money_response( max( $child_prices ), wc_get_price_decimals() ),
				];
			}
		}

		return null;
	}
}
