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
	public function init() {
		$this->enable_connection_feature();

		return $this->register_site();
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

		$jetpack_id     = \Jetpack_Options::get_option( 'id' );
		$jetpack_public = \Jetpack_Options::get_option( 'public' );

		if ( $jetpack_id && $jetpack_public ) {
			$register = true;
		} else {
			$register = $manager->register();
		}

		if ( true === $register && ! $manager->is_user_connected() ) {
			$manager->connect_user();

			return true;
		}

		return false;
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
}
