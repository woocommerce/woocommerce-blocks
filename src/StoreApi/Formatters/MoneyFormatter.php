<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Formatters;

/**
 * Money Formatter.
 *
 * Formats monetary values using store settings.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class MoneyFormatter extends AbstractFormatter {
	/**
	 * Format a given value and return the result.
	 *
	 * @param mixed $value Value to format.
	 * @return mixed
	 */
	public function format( $value ) {
		return (string) intval(
			round(
				( (float) wc_format_decimal( $value ) ) * ( 10 ** $this->get_decimals() ),
				0,
				$this->get_rounding_mode()
			)
		);
	}

	/**
	 * Gets the number of decimals precision to format monetary values with.
	 *
	 * @return int
	 */
	private function get_decimals() {
		return absint( $this->get_option( 'decimals', 2 ) );
	}

	/**
	 * Gets the rounding mode for rounding monetary values.
	 *
	 * @return int
	 */
	private function get_rounding_mode() {
		return absint( $this->get_option( 'rounding_mode', PHP_ROUND_HALF_UP ) );
	}
}
