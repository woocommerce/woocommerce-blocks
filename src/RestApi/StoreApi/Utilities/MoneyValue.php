<?php
/**
 * Handles monetary values using integers by using the smallest unit of a currency.
 *
 * This could be replaced with https://github.com/moneyphp/money if we want to
 * support currencies in the future. However at this stage we only need to use
 * the store decimal setting (which is independent of currency) to format
 * values for the API.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities;

defined( 'ABSPATH' ) || exit;

/**
 * MoneyValue class.
 */
class MoneyValue {

	/**
	 * Monetary amount. Integer stored as string.
	 *
	 * @var string
	 */
	protected $amount = '0';

	/**
	 * Converts to string if this class is used as a string.
	 */
	public function __toString() {
		return $this->amount;
	}

	/**
	 * Return the price amount.
	 *
	 * @return string|int
	 */
	public function get_amount() {
		return $this->amount > PHP_INT_MAX ? $this->amount : (int) $this->amount;
	}

	/**
	 * Set monetary amount in subunit format from decimal format.
	 *
	 * @param string|float $amount Monetary amount with decimals.
	 * @param int          $decimals Number if decimals the amount is formatted with.
	 * @param string       $rounding_mode Valid rounding mode: PHP_ROUND_HALF_DOWN, PHP_ROUND_HALF_UP, PHP_ROUND_HALF_EVEN, PHP_ROUND_HALF_ODD.
	 * @return string      The new amount.
	 */
	public function from_decimal( $amount, $decimals = 2, $rounding_mode = 'PHP_ROUND_HALF_UP' ) {
		$this->amount = (string) intval(
			round(
				wc_format_decimal( $amount ) * pow( 10, $decimals ),
				0,
				$this->get_rounding_mode( $rounding_mode )
			)
		);

		return $this->get_amount();
	}

	/**
	 * Get rounding mode constant to pass from PHP round.
	 *
	 * @param string|int $rounding_mode Either a PHP rounding mode constant name, or number.
	 * @return int
	 */
	protected function get_rounding_mode( $rounding_mode = 'PHP_ROUND_HALF_UP' ) {
		if ( is_numeric( $rounding_mode ) ) {
			return (int) $rounding_mode;
		}

		if ( defined( $rounding_mode ) ) {
			return constant( $rounding_mode );
		}

		return 1;
	}
}
