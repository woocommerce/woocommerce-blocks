<?php

namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\Blocks\Patterns\PatternImages;
use Automattic\WooCommerce\Blocks\Verticals\Client;
use Automattic\WooCommerce\Blocks\Verticals\VerticalsSelector;

/**
 * Patterns class.
 */
class Patterns extends AbstractRoute {
	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'patterns';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const SCHEMA_TYPE = 'patterns';

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/patterns';
	}

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
				'args'                => [
					'business_description' => [
						'description' => __( 'The business description for a given store.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
					],
				],
			],
			'schema'      => [ $this->schema, 'get_public_item_schema' ],
			'allow_batch' => [ 'v1' => true ],
		];
	}

	/**
	 * Ensure the content and images in patterns are powered by AI.
	 *
	 * @param  \WP_REST_Request $request Request object.
	 *
	 * @return bool|string|\WP_Error|\WP_REST_Response
	 */
	protected function get_route_post_response( \WP_REST_Request $request ) {
		$allow_ai_connection = get_option( 'woocommerce_blocks_allow_ai_connection' );

		if ( ! $allow_ai_connection ) {
			return new \WP_Error(
				'ai_connection_not_allowed',
				__( 'AI content generation is not allowed on this store. Update your store settings if you want to enable this feature.', 'woo-gutenberg-products-block' )
			);
		}

		$business_description = sanitize_text_field( wp_unslash( $request['business_description'] ) );
		$vertical_id          = ( new VerticalsSelector() )->get_vertical_id( $business_description );

		if ( is_wp_error( $vertical_id ) ) {
			$response = $this->error_to_response( $vertical_id );
		}

		$populate_images = ( new PatternImages() )->create_patterns_content( $vertical_id, new Client() );

		if ( is_wp_error( $populate_images ) ) {
			$response = $this->error_to_response( $populate_images );
		}

		if ( ! isset( $response ) ) {
			$response = (object) [
				'ai_content_generated' => true,
			];
		}

		return rest_ensure_response( $this->prepare_item_for_response( $response, $request ) );
	}
}
