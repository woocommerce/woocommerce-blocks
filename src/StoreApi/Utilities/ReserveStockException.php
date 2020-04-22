<?php
/**
 * Exceptions for stock reservation.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\StoreApi\Utilities;

/**
 * ReserveStockException class.
 */
class ReserveStockException extends \Exception {
	/**
	 * Sanitized error code.
	 *
	 * @var string
	 */
	protected $error_code;

	/**
	 * Error extra data.
	 *
	 * @var array
	 */
	protected $error_data;

	/**
	 * Setup exception.
	 *
	 * @param string $code             Machine-readable error code, e.g `woocommerce_invalid_product_id`.
	 * @param string $message          User-friendly translated error message, e.g. 'Product ID is invalid'.
	 * @param int    $http_status_code Proper HTTP status code to respond with, e.g. 400.
	 * @param array  $data             Extra error data.
	 */
	public function __construct( $code, $message, $http_status_code = 400, $data = array() ) {
		$this->error_code = $code;
		$this->error_data = $data;

		parent::__construct( $message, $http_status_code );
	}

	/**
	 * Returns the error code.
	 *
	 * @return string
	 */
	public function getErrorCode() {
		return $this->error_code;
	}

	/**
	 * Returns error data.
	 *
	 * @return array
	 */
	public function getErrorData() {
		return $this->error_data;
	}
}
