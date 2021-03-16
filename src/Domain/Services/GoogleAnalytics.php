<?php
namespace Automattic\WooCommerce\Blocks\Domain\Services;

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;

/**
 * Service class to integrate Blocks with the Google Analytics extension,
 */
class GoogleAnalytics {

	/**
	 * Stores a record of inline scripts already enqueued.
	 *
	 * @var array
	 */
	private $inline_scripts = [];

	/**
	 * Constructor
	 */
	public function __construct() {
		if ( ! Package::feature()->is_experimental_build() ) {
			return;
		}
		add_action( 'init', array( $this, 'register_assets' ) );
		add_action( 'init', array( $this, 'inline_block_tracking' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_filter( 'script_loader_tag', array( $this, 'async_script_loader_tags' ), 10, 3 );
	}

	/**
	 * Inline tracking events for blocks which are server side rendered, or saved to the post.
	 */
	public function inline_block_tracking() {
		add_action(
			'experimental__product-search_render_callback',
			function() {
				$this->add_inline_script(
					'wc-blocks-google-analytics',
					"
					const forms = document.querySelectorAll( '.wc-block-product-search form' );

					for ( const form of forms ) {
						form.addEventListener( 'submit', () => {
							const field = form.querySelector( '.wc-block-product-search__field' );

							if ( field && field.value ) {
								wp.hooks.doAction( 'experimental__woocommerce_blocks-product-search', { searchTerm: field.value } );
							}
						} );
					}
					"
				);
			}
		);
	}

	/**
	 * Register scripts.
	 */
	public function register_assets() {
		$asset_api = Package::container()->get( AssetApi::class );
		$asset_api->register_script( 'wc-blocks-google-analytics', 'build/wc-blocks-google-analytics.js', [ 'google-tag-manager' ] );
	}

	/**
	 * Enqueue the Google Tag Manager script if prerequisites are met.
	 *
	 * @param AssetApi $asset_api Asset API class Instance.
	 */
	public function enqueue_scripts( $asset_api ) {
		$asset_api = Package::container()->get( AssetApi::class );
		$settings  = $this->get_google_analytics_settings();

		if ( is_admin() || ! stristr( $settings['ga_id'], 'G-' ) || apply_filters( 'woocommerce_ga_disable_tracking', ! wc_string_to_bool( $settings['ga_event_tracking_enabled'] ) ) ) {
			return;
		}

		if ( ! wp_script_is( 'google-tag-manager', 'registered' ) ) {
			// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
			wp_register_script( 'google-tag-manager', 'https://www.googletagmanager.com/gtag/js?id=' . $settings['ga_id'], [], null, false );
			wp_add_inline_script(
				'google-tag-manager',
				"
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', '" . esc_js( $settings['ga_id'] ) . "', { 'send_page_view': false });"
			);
		}

		wp_enqueue_script( 'wc-blocks-google-analytics' );
	}

	/**
	 * Adds an inline script, once.
	 *
	 * @param string $handle Script handle.
	 * @param string $script Script contents.
	 */
	private function add_inline_script( $handle, $script ) {
		if ( ! empty( $this->inline_scripts[ $handle ] ) && in_array( $script, $this->inline_scripts[ $handle ], true ) ) {
			return;
		}

		wp_add_inline_script( $handle, $script );

		if ( isset( $this->inline_scripts[ $handle ] ) ) {
			$this->inline_scripts[ $handle ][] = $script;
		} else {
			$this->inline_scripts[ $handle ] = array( $script );
		}
	}

	/**
	 * Get settings from the GA integration extension.
	 *
	 * @return array
	 */
	private function get_google_analytics_settings() {
		return wp_parse_args(
			get_option( 'woocommerce_google_analytics_settings' ),
			[
				'ga_id'                     => '',
				'ga_event_tracking_enabled' => 'no',
			]
		);
	}

	/**
	 * Add async to script tags with defined handles.
	 *
	 * @param string $tag HTML for the script tag.
	 * @param string $handle Handle of script.
	 * @param string $src Src of script.
	 * @return string
	 */
	public function async_script_loader_tags( $tag, $handle, $src ) {
		if ( ! in_array( $handle, array( 'google-tag-manager' ), true ) ) {
			return $tag;
		}
		// If script was output manually in wp_head, abort.
		if ( did_action( 'woocommerce_gtag_snippet' ) ) {
			return '';
		}
		return str_replace( '<script src', '<script async src', $tag );
	}
}
