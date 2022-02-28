<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Utilities;

/**
 * WpErrorResponse class.
 */
class WpErrorResponse {
	/**
	 * Error data.
	 *
	 * @var array
	 */
	private $data = [];

	/**
	 * Error headers for response.
	 *
	 * @var array
	 */
	private $headers = [];

	/**
	 * Status code for response.
	 *
	 * @var integer
	 */
	private $status = 500;

	/**
	 * Populate data from given \WP_Error object.
	 *
	 * @param \WP_Error $error Error object.
	 */
	public function __construct( \WP_Error $error ) {
		$error_data = $error->get_all_error_data();

		$this->status = array_reduce(
			$error_data,
			static function ( $status, $error_data ) {
				return is_array( $error_data ) && isset( $error_data['status'] ) ? $error_data['status'] : $status;
			},
			500
		);

		$this->headers = array_reduce(
			$error_data,
			static function ( $headers, $error_data ) {
				return is_array( $error_data ) && isset( $error_data['headers'] ) ? array_merge( $headers, $error_data['headers'] ) : $headers;
			},
			[]
		);

		$errors = [];

		foreach ( (array) $error->errors as $code => $messages ) {
			foreach ( (array) $messages as $message ) {
				$error_data = $error->get_error_data( $code );
				unset( $error_data['headers'] );
				$errors[] = array(
					'code'    => $code,
					'message' => $message,
					'data'    => $error_data,
				);
			}
		}

		$this->data = array_shift( $errors );

		if ( count( $errors ) ) {
			$this->data['additional_errors'] = $errors;
		}
	}

	/**
	 * Return \WP_REST_Response from data.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_response() {
		$response = new \WP_REST_Response( $this->data, $this->status );

		foreach ( $this->headers as $header => $header_value ) {
			$response->header( $header, $header_value );
		}

		return $response;
	}
}
