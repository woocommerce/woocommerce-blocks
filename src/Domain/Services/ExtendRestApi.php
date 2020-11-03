<?php
namespace Automattic\WooCommerce\Blocks\Domain\Services;

use Throwable;

/**
 * Service class to provide utility functions to extend REST API.
 */
class ExtendRestApi {
	/**
	 * Valid endpoints to extend
	 *
	 * @var array
	 */
	private $endpoints = [ 'item' ];

	/**
	 * An endpoint that validates registration method call
	 *
	 * @param string   $endpoint The endpoint to extend.
	 * @param string   $namespace Plugin namespace.
	 * @param callable $schema_callback Callback executed to add schema data.
	 * @param callable $data_callback Callback executed to add endpoint data.
	 */
	private function validate_endpoint_data( $endpoint, $namespace, $schema_callback, $data_callback ) {
		if ( ! is_string( $namespace ) ) {
			$this->throw_exception(
				'You must provide a plugin namespace when extending a Store REST endpoint.'
			);
		}

		if ( ! is_string( $endpoint ) || ! in_array( $endpoint, $this->endpoints, true ) ) {
			$this->throw_exception(
				'You must provide a valid Store REST endpoint to extend, valid endpoints are: ' . implode( ', ', $this->endpoints )
			);
		}

		if ( ! is_callable( $schema_callback ) ) {
			$this->throw_exception(
				'$schema_callback must be a callable function.'
			);
		}

		if ( ! is_callable( $data_callback ) ) {
			$this->throw_exception(
				'$data_callback must be a callable function.'
			);
		}
	}

	/**
	 * Extends the items in store/cart endpoint
	 *
	 * @param string   $namespace Plugin namespace.
	 * @param callable $schema_callback Callback executed to add schema data.
	 * @param callable $data_callback Callback executed to add endpoint data, gets cart item data as param.
	 */
	public function register_cart_item_endpoint_data( $namespace, $schema_callback, $data_callback ) {
		$this->validate_endpoint_data( 'item', $namespace, $schema_callback, $data_callback );

		add_filter(
			'__internal_extend_cart_item_schema',
			function( $schema ) use ( $schema_callback, $namespace ) {
				$schema_data = [];

				try {
					$schema_data = $schema_callback();
				} catch ( Throwable $e ) {
					$this->throw_exception( $e );
					return $schema;
				}

				if ( ! is_array( $schema_data ) ) {
					$this->throw_exception(
						'$schema_callback must return an array.'
					);
					return $schema;
				}

				$schema[ $namespace ] = $schema_data;
				return $schema;
			},
			10,
			1
		);

		add_filter(
			'__internal_extend_cart_item_data',
			function( $data, $cart_item ) use ( $data_callback, $namespace ) {
				$endpoint_data = [];

				try {
					$endpoint_data = $data_callback( $cart_item );
				} catch ( Throwable $e ) {
					$this->throw_exception( $e );
					return $data;
				}

				if ( ! is_array( $endpoint_data ) ) {
					$this->throw_exception( '$endpoint_data must return an array.' );
					return $data;
				}

				$data[ $namespace ] = $endpoint_data;
				return $data;
			},
			10,
			2
		);
	}

	/**
	 * Throws error or silently logs it.
	 *
	 * @param string|Exception $exception_or_error Error message or Exception.
	 * @throws Exception An error to throw if we have debug enabled and user is admin.
	 */
	private function throw_exception( $exception_or_error ) {
		if ( $exception_or_error instanceof Exception ) {
			$exception = $exception_or_error;
		} else {
			$exception = Exception( $exception_or_error );
		}

		if ( defined( 'WP_DEBUG' ) && WP_DEBUG && current_user_can( 'manage_woocommerce' ) ) {
			throw $exception;
		} else {
			wc_caught_exception( $exception_or_error );
		}
	}
}
