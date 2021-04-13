<?php
namespace Automattic\WooCommerce\Blocks\Assets;

use Exception;
use InvalidArgumentException;

/**
 * Class instance for registering data used on the current view session by
 * assets.
 *
 * Holds data registered for output on the current view session when
 * `wc-settings` is enqueued( directly or via dependency )
 *
 * @since 2.5.0
 */
class AssetDataRegistry {
	/**
	 * Contains registered data.
	 *
	 * @var array
	 */
	private $data = [];

	/**
	 * Lazy data is an array of closures that will be invoked just before
	 * asset data is generated for the enqueued script.
	 *
	 * @var array
	 */
	private $lazy_data = [];

	/**
	 * Asset handle for registered data.
	 *
	 * @var string
	 */
	private $handle = 'wc-settings';

	/**
	 * Asset API interface for various asset registration.
	 *
	 * @var API
	 */
	private $api;

	/**
	 * Constructor
	 *
	 * @param Api $asset_api  Asset API interface for various asset registration.
	 */
	public function __construct( Api $asset_api ) {
		$this->api = $asset_api;
		$this->init();
	}

	/**
	 * Hook into WP asset registration for enqueueing asset data.
	 */
	protected function init() {
		add_action( 'init', array( $this, 'register_data_script' ) );
		add_action( 'wp_print_footer_scripts', array( $this, 'enqueue_asset_data' ), 1 );
		add_action( 'admin_print_footer_scripts', array( $this, 'enqueue_asset_data' ), 1 );
	}

	/**
	 * Exposes core data via the wcSettings global. This data is shared throughout the client.
	 *
	 * Settings that are used by various components or multiple blocks should be added here. Note, that settings here are
	 * global so be sure not to add anything heavy if possible.
	 *
	 * @return array  An array containing core data.
	 */
	protected function get_core_data() {
		global $wp_locale;
		$currency       = get_woocommerce_currency();
		$tag_count      = wp_count_terms( 'product_tag' );
		$product_counts = wp_count_posts( 'product' );
		$page_ids       = [
			'myaccount' => wc_get_page_id( 'myaccount' ),
			'shop'      => wc_get_page_id( 'shop' ),
			'cart'      => wc_get_page_id( 'cart' ),
			'checkout'  => wc_get_page_id( 'checkout' ),
			'privacy'   => wc_privacy_policy_page_id(),
			'terms'     => wc_terms_and_conditions_page_id(),
		];

		return [
			'adminUrl'                    => admin_url(),
			'countries'                   => WC()->countries->get_countries(),
			'currency'                    => [
				'code'              => $currency,
				'precision'         => wc_get_price_decimals(),
				'symbol'            => html_entity_decode( get_woocommerce_currency_symbol( $currency ) ),
				'symbolPosition'    => get_option( 'woocommerce_currency_pos' ),
				'decimalSeparator'  => wc_get_price_decimal_separator(),
				'thousandSeparator' => wc_get_price_thousand_separator(),
				'priceFormat'       => html_entity_decode( get_woocommerce_price_format() ),
			],
			'currentUserIsAdmin'          => is_user_logged_in() && current_user_can( 'manage_woocommerce' ),
			'hasDarkEditorStyleSupport'   => current_theme_supports( 'dark-editor-style' ),
			'hideOutOfStockItems'         => 'yes' === get_option( 'woocommerce_hide_out_of_stock_items' ),
			'homeUrl'                     => esc_url( home_url( '/' ) ),
			'isLargeCatalog'              => $product_counts->publish > 100,
			'locale'                      => [
				'siteLocale'    => get_locale(),
				'userLocale'    => get_user_locale(),
				'weekdaysShort' => array_values( $wp_locale->weekday_abbrev ),
			],
			'loginUrl'                    => wp_login_url(),
			'orderStatuses'               => $this->get_order_statuses( wc_get_order_statuses() ),

			'restApiRoutes'               => [
				'/wc/store' => array_keys( Package::container()->get( RestApi::class )->get_routes_from_namespace( 'wc/store' ) ),
			],
			'siteTitle'                   => get_bloginfo( 'name' ),
			'storePages'                  => [
				'myaccount' => $this->format_page_resource( $page_ids['myaccount'] ),
				'shop'      => $this->format_page_resource( $page_ids['shop'] ),
				'cart'      => $this->format_page_resource( $page_ids['cart'] ),
				'checkout'  => $this->format_page_resource( $page_ids['checkout'] ),
				'privacy'   => $this->format_page_resource( $page_ids['privacy'] ),
				'terms'     => $this->format_page_resource( $page_ids['terms'] ),
			],
			'wcAssetUrl'                  => plugins_url( 'assets/', WC_PLUGIN_FILE ),
			'wcBlocksAssetUrl'            => plugins_url( 'assets/', dirname( __DIR__ ) ),
			'wcBlocksBuildUrl'            => plugins_url( 'build/', dirname( __DIR__ ) ),
			'wcBlocksPhase'               => Automattic\WooCommerce\Blocks\Package::feature()->get_flag(),
			'wcVersion'                   => defined( 'WC_VERSION' ) ? WC_VERSION : '',

			/*
			 * translators: If your word count is based on single characters (e.g. East Asian characters),
			 * enter 'characters_excluding_spaces' or 'characters_including_spaces'. Otherwise, enter 'words'.
			 * Do not translate into your own language.
			 */
			'wordCountType'               => _x( 'words', 'Word count type. Do not translate!', 'woo-gutenberg-products-block' ),
			'wpVersion'                   => get_bloginfo( 'version' ),

			// @todo See if grid settings can be moved to product blocktypes.
			'min_columns'                 => wc_get_theme_support( 'product_blocks::min_columns', 1 ),
			'max_columns'                 => wc_get_theme_support( 'product_blocks::max_columns', 6 ),
			'default_columns'             => wc_get_theme_support( 'product_blocks::default_columns', 3 ),
			'min_rows'                    => wc_get_theme_support( 'product_blocks::min_rows', 1 ),
			'max_rows'                    => wc_get_theme_support( 'product_blocks::max_rows', 6 ),
			'default_rows'                => wc_get_theme_support( 'product_blocks::default_rows', 3 ),
			'placeholderImgSrc'           => wc_placeholder_img_src(),

			// @todo Move reviewRatingsEnabled and showAvatars to reviews blocktype.
			'reviewRatingsEnabled'        => wc_review_ratings_enabled(),
			'showAvatars'                 => '1' === get_option( 'show_avatars' ),

			// @todo Review shippingCostRequiresAddress which is used in sample data but might not be required.
			'shippingCostRequiresAddress' => filter_var( get_option( 'woocommerce_shipping_cost_requires_address' ), FILTER_VALIDATE_BOOLEAN ),

			// @todo Move limitTags and hasTags to product tag block.
			'limitTags'                   => $tag_count > 100,
			'hasTags'                     => $tag_count > 0,

			// @todo move productCount to price filter block.
			'productCount'                => array_sum( (array) $product_counts ),

			// @todo Move attributes to attribute filter block.
			'attributes'                  => array_values( wc_get_attribute_taxonomies() ),

			// @todo Move min_height and default_height to featured product/cat blocktype.
			'min_height'                  => wc_get_theme_support( 'featured_block::min_height', 500 ),
			'default_height'              => wc_get_theme_support( 'featured_block::default_height', 500 ),
		];
	}

	/**
	 * Format a page object into a standard array of data.
	 *
	 * @param WP_Post|int $page Page object or ID.
	 * @return array
	 */
	protected function format_page_resource( $page ) {
		if ( is_numeric( $page ) && $page > 0 ) {
			$page = get_post( $page );
		}
		if ( ! is_a( $page, '\WP_Post' ) || 'publish' !== $page->post_status ) {
			return [
				'id'        => 0,
				'title'     => '',
				'permalink' => false,
			];
		}
		return [
			'id'        => $page->ID,
			'title'     => $page->post_title,
			'permalink' => get_permalink( $page->ID ),
		];
	}

	/**
	 * Returns block-related data for enqueued wc-settings script.
	 * Format order statuses by removing a leading 'wc-' if present.
	 *
	 * @param array $statuses Order statuses.
	 * @return array formatted statuses.
	 */
	protected function get_order_statuses( $statuses ) {
		$formatted_statuses = array();
		foreach ( $statuses as $key => $value ) {
			$formatted_key                        = preg_replace( '/^wc-/', '', $key );
			$formatted_statuses[ $formatted_key ] = $value;
		}
		return $formatted_statuses;
	}

	/**
	 * Used for on demand initialization of asset data and registering it with
	 * the internal data registry.
	 *
	 * Note: core data will overwrite any externally registered data via the api.
	 */
	protected function initialize_core_data() {
		/**
		 * Low level hook for registration of new data late in the cycle.
		 *
		 * Developers, do not use this hook as it is likely to be removed.
		 * Instead, use the data api:
		 * Automattic\WooCommerce\Blocks\Package::container()
		 *     ->get( Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry::class )
		 *     ->add( $key, $value )
		 */
		$settings = apply_filters(
			'woocommerce_shared_settings',
			$this->data
		);

		// note this WILL wipe any data already registered to these keys because
		// they are protected.
		$this->data = array_replace_recursive( $settings, $this->get_core_data() );
	}

	/**
	 * Loops through each registered lazy data callback and adds the returned
	 * value to the data array.
	 *
	 * This method is executed right before preparing the data for printing to
	 * the rendered screen.
	 *
	 * @return void
	 */
	protected function execute_lazy_data() {
		foreach ( $this->lazy_data as $key => $callback ) {
			$this->data[ $key ] = $callback();
		}
	}

	/**
	 * Exposes private registered data to child classes.
	 *
	 * @return array  The registered data on the private data property
	 */
	protected function get() {
		return $this->data;
	}

	/**
	 * Allows checking whether a key exists.
	 *
	 * @param string $key  The key to check if exists.
	 * @return bool  Whether the key exists in the current data registry.
	 */
	public function exists( $key ) {
		return array_key_exists( $key, $this->data );
	}

	/**
	 * Interface for adding data to the registry.
	 *
	 * You can only register data that is not already in the registry identified by the given key. If there is a
	 * duplicate found, unless $ignore_duplicates is true, an exception will be thrown.
	 *
	 * @param string  $key               The key used to reference the data being registered.
	 * @param mixed   $data              If not a function, registered to the registry as is. If a function, then the
	 *                                   callback is invoked right before output to the screen.
	 * @param boolean $check_key_exists If set to true, duplicate data will be ignored if the key exists.
	 *                                  If false, duplicate data will cause an exception.
	 *
	 * @throws InvalidArgumentException  Only throws when site is in debug mode. Always logs the error.
	 */
	public function add( $key, $data, $check_key_exists = false ) {
		if ( $check_key_exists && $this->exists( $key ) ) {
			return;
		}
		try {
			$this->add_data( $key, $data );
		} catch ( Exception $e ) {
			if ( $this->debug() ) {
				// bubble up.
				throw $e;
			}
			wc_caught_exception( $e, __METHOD__, [ $key, $data ] );
		}
	}

	/**
	 * Adds a page permalink to the data registry.
	 *
	 * @param integer $page_id Page ID to add to the registry.
	 */
	public function register_page_id( $page_id ) {
		$permalink = $page_id ? get_permalink( $page_id ) : false;

		if ( $permalink ) {
			$this->data[ 'page-' . $page_id ] = $permalink;
		}
	}

	/**
	 * Callback for registering the data script via WordPress API.
	 *
	 * @return void
	 */
	public function register_data_script() {
		$this->api->register_script(
			$this->handle,
			'build/wc-settings.js',
			[],
			false
		);
	}

	/**
	 * Callback for enqueuing asset data via the WP api.
	 *
	 * Note: while this is hooked into print/admin_print_scripts, it still only
	 * happens if the script attached to `wc-settings` handle is enqueued. This
	 * is done to allow for any potentially expensive data generation to only
	 * happen for routes that need it.
	 */
	public function enqueue_asset_data() {
		if ( wp_script_is( $this->handle, 'enqueued' ) ) {
			$this->initialize_core_data();
			$this->execute_lazy_data();
			$data = rawurlencode( wp_json_encode( $this->data ) );
			wp_add_inline_script(
				$this->handle,
				"var wcSettings = wcSettings || JSON.parse( decodeURIComponent( '"
					. esc_js( $data )
					. "' ) );",
				'before'
			);
		}
	}

	/**
	 * See self::add() for docs.
	 *
	 * @param   string $key   Key for the data.
	 * @param   mixed  $data  Value for the data.
	 *
	 * @throws InvalidArgumentException  If key is not a string or already
	 *                                   exists in internal data cache.
	 */
	protected function add_data( $key, $data ) {
		if ( ! is_string( $key ) ) {
			if ( $this->debug() ) {
				throw new InvalidArgumentException(
					'Key for the data being registered must be a string'
				);
			}
		}
		if ( isset( $this->data[ $key ] ) ) {
			if ( $this->debug() ) {
				throw new InvalidArgumentException(
					'Overriding existing data with an already registered key is not allowed'
				);
			}
			return;
		}
		if ( \is_callable( $data ) ) {
			$this->lazy_data[ $key ] = $data;
			return;
		}
		$this->data[ $key ] = $data;
	}

	/**
	 * Exposes whether the current site is in debug mode or not.
	 *
	 * @return boolean  True means the site is in debug mode.
	 */
	protected function debug() {
		return defined( 'WP_DEBUG' ) && WP_DEBUG;
	}
}
