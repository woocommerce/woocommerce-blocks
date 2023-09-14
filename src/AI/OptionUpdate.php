<?php

namespace Automattic\WooCommerce\Blocks\AI;

use Automattic\WooCommerce\Blocks\Patterns\PatternImages;
use Automattic\WooCommerce\Blocks\Verticals\Client;
use Automattic\WooCommerce\Blocks\Verticals\VerticalsSelector;

/**
 * OptionUpdate class.
 */
class OptionUpdate {

	/**
	 * OptionUpdate constructor.
	 */
	public function __construct() {
		if ( class_exists( 'WooCommerce' ) ) {
			$woocommerce_base_dir = WP_PLUGIN_DIR . '/woocommerce/';

			require_once $woocommerce_base_dir . 'includes/libraries/action-scheduler/action-scheduler.php';
		}

		add_action( 'add_option_woo_ai_describe_store_description', array( $this, 'ai_store_description_changed' ), 10, 2 );
		add_action( 'woocommerce_update_patterns_content', array( $this, 'update_patterns_content' ) );
	}

	/**
	 * Update the patterns content when the store description is changed.
	 *
	 * @param string $option The option name.
	 * @param string $value The option value.
	 *
	 * @return bool|int|string|void|\WP_Error
	 */
	public function ai_store_description_changed( $option, $value ) {
		as_schedule_single_action( time(), 'woocommerce_update_patterns_content', array( $value ) );
	}

	/**
	 * Update the patterns content.
	 *
	 * @param string $value The new value saved for the add_option_woo_ai_describe_store_description option.
	 *
	 * @return bool|int|string|\WP_Error
	 */
	protected function update_patterns_content( $value ) {
		$allow_ai_connection = get_option( 'woocommerce_blocks_allow_ai_connection' );

		if ( ! $allow_ai_connection ) {
			return new \WP_Error(
				'ai_connection_not_allowed',
				__( 'AI content generation is not allowed on this store. Update your store settings if you wish to enable this feature.', 'woo-gutenberg-products-block' )
			);
		}

		$vertical_id = ( new VerticalsSelector() )->get_vertical_id( $value );

		if ( is_wp_error( $vertical_id ) ) {
			return $vertical_id;
		}

		return ( new PatternImages() )->create_patterns_content( $vertical_id, new Client() );
	}
}
