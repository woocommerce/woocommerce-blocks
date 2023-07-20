<?php
namespace Automattic\WooCommerce\StoreApi\Utilities;

/**
 * CheckoutTrait
 */
trait CheckoutTrait {
	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'get_response' ],
				'permission_callback' => '__return_true',
				'args'                => array_merge(
					[
						'payment_data' => [
							'description' => __( 'Data to pass through to the payment method when processing payment.', 'woo-gutenberg-products-block' ),
							'type'        => 'array',
							'items'       => [
								'type'       => 'object',
								'properties' => [
									'key'   => [
										'type' => 'string',
									],
									'value' => [
										'type' => [ 'string', 'boolean' ],
									],
								],
							],
						],
					],
					$this->schema->get_endpoint_args_for_item_schema( \WP_REST_Server::CREATABLE )
				),
			],
			'schema'      => [ $this->schema, 'get_public_item_schema' ],
			'allow_batch' => [ 'v1' => true ],
		];
	}
}
