<?php
/**
 * Abstract Schema.
 *
 * Rest API schema class.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

/**
 * AbstractBlock class.
 *
 * @since 2.5.0
 */
abstract class AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'Schema';

	/**
	 * Returns the full item schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return array(
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => $this->title,
			'type'       => 'object',
			'properties' => $this->get_properties(),
		);
	}

	/**
	 * Returns schema properties.
	 *
	 * @return array
	 */
	abstract protected function get_properties();

	/**
	 * Force all schema properties to be readonly.
	 *
	 * @param array $properties Schema.
	 * @return array Updated schema.
	 */
	protected function force_schema_readonly( $properties ) {
		return array_map(
			function( $property ) {
				$property['readonly'] = true;
				if ( isset( $property['items']['properties'] ) ) {
					$property['items']['properties'] = $this->force_schema_readonly( $property['items']['properties'] );
				}
				return $property;
			},
			$properties
		);
	}

	/**
	 * Prepares a list of store currency data to return in responses.
	 *
	 * @return array
	 */
	protected function get_store_currency_response() {
		$position = get_option( 'woocommerce_currency_pos' );
		$symbol   = html_entity_decode( get_woocommerce_currency_symbol() );
		$prefix   = '';
		$suffix   = '';

		switch ( $position ) {
			case 'left_space':
				$prefix = $symbol . ' ';
				break;
			case 'left':
				$prefix = $symbol;
				break;
			case 'right_space':
				$suffix = ' ' . $symbol;
				break;
			case 'right':
				$suffix = $symbol;
				break;
		}

		return [
			'currency_code'               => get_woocommerce_currency(),
			'currency_symbol'             => $symbol,
			'currency_minor_unit'         => wc_get_price_decimals(),
			'currency_decimal_separator'  => wc_get_price_decimal_separator(),
			'currency_thousand_separator' => wc_get_price_thousand_separator(),
			'currency_prefix'             => $prefix,
			'currency_suffix'             => $suffix,
		];
	}

	/**
	 * Convert monetary values from WooCommerce to string based integers, using
	 * the smallest unit of a currency.
	 *
	 * @param string|float $amount Monetary amount with decimals.
	 * @param int          $decimals Number of decimals the amount is formatted with.
	 * @param int          $rounding_mode Defaults to the PHP_ROUND_HALF_UP constant.
	 * @return string      The new amount.
	 */
	protected function prepare_money_response( $amount, $decimals = 2, $rounding_mode = PHP_ROUND_HALF_UP ) {
		return (string) intval(
			round(
				wc_format_decimal( $amount ) * ( 10 ** $decimals ),
				0,
				absint( $rounding_mode )
			)
		);
	}
}
