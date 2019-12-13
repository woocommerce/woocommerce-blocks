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
	protected $amount;

	/**
	 * Constructor.
	 *
	 * @param string|integer $amount Set money amount.
	 */
	public function __construct( $amount = '0' ) {
		$this->amount = (string) $amount;
	}

	/**
	 * Output raw amount when used as a string.
	 *
	 * @return string
	 */
	public function __toString() {
		return $this->amount;
	}

	/**
	 * Return the price amount.
	 *
	 * @return string
	 */
	public function get_amount() {
		return $this->amount;
	}

	/**
	 * Set monetary amount in subunit format from decimal format.
	 *
	 * @param string|float $amount Monetary amount with decimals.
	 * @param int          $decimals Number if decimals the amount is formatted with.
	 * @param int          $rounding_mode Defaults to the PHP_ROUND_HALF_UP constant.
	 * @return string      The new amount.
	 */
	public function from_decimal( $amount, $decimals = 2, $rounding_mode = PHP_ROUND_HALF_UP ) {
		$this->amount = (string) intval(
			round(
				wc_format_decimal( $amount ) * ( 10 ** $decimals ),
				0,
				$rounding_mode
			)
		);

		return $this->get_amount();
	}
}
