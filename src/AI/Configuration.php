<?php

namespace Automattic\WooCommerce\Blocks\AI;

use Automattic\Jetpack\Config;
use Automattic\Jetpack\Connection\Manager;
use Automattic\Jetpack\Connection\Utils;

/**
 * Class Configuration
 */
class Configuration {

	/**
	 * The name of the option that stores the site owner's consent to connect to the AI API.
	 *
	 * @var string
	 */
	private $consent_option_name = 'woocommerce_blocks_allow_ai_connection';

	/**
	 * Register and Connect the site & user with Jetpack.
	 *
	 * @return bool
	 */
	public function register_and_connect() {
		$this->enable_connection_feature();

		$register = $this->register_site();

		if ( is_wp_error( $register ) ) {
			return false;
		}

		$this->connect_user();

		return true;
	}

	/**
	 * Initialize Jetpack's connection feature within the WooCommerce Blocks plugin.
	 *
	 * @return void
	 */
	private function enable_connection_feature() {
		$site_owner_consent = get_option( $this->consent_option_name );

		if ( ! $site_owner_consent || ! class_exists( 'Automattic\Jetpack\Config' ) ) {
			return;
		}

		( new Config() )->ensure(
			'connection',
			array(
				'slug' => 'woocommerce/woocommerce-blocks',
				'name' => 'WooCommerce Blocks',
			)
		);
	}

	/**
	 * Register the site with Jetpack.
	 *
	 * @return bool|\WP_Error
	 */
	private function register_site() {
		$site_owner_consent = get_option( $this->consent_option_name );

		if (
			! $site_owner_consent ||
			! class_exists( 'Automattic\Jetpack\Connection\Utils' ) ||
			! class_exists( 'Automattic\Jetpack\Connection\Manager' )
		) {
			return false;
		}

		Utils::init_default_constants();

		$manager = new Manager( 'woocommerce/woocommerce-blocks' );

		return $manager->register();
	}

	/**
	 * Unregister the site with Jetpack.
	 *
	 * @return void
	 */
	private function unregister_site() {
		$manager = new Manager( 'woocommerce/woocommerce-blocks' );

		if ( $manager->is_connected() ) {
			$manager->remove_connection();
		}
	}

	/**
	 * Connect the user.
	 *
	 * @return void
	 */
	private function connect_user() {
		$manager = new Manager( 'woocommerce/woocommerce-blocks' );

		if ( ! $manager->is_connected() || $manager->is_user_connected() ) {
			return;
		}

		$manager->connect_user();
	}
}
