<?php
/**
 * Initializes block assets.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Assets class.
 */
class Assets {

	/**
	 * Initialize class features on init.
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register_assets' ) );
		add_action( 'admin_print_scripts', array( __CLASS__, 'maybe_add_asset_data' ), 1 );
		add_action( 'admin_print_footer_scripts', array( __CLASS__, 'maybe_add_asset_data' ), 1 );
		add_action( 'wp_print_scripts', array( __CLASS__, 'maybe_add_asset_data' ), 1 );
		add_action( 'wp_print_footer_scripts', array( __CLASS__, 'maybe_add_asset_data' ), 1 );
		add_filter( 'woocommerce_shared_settings', array( __CLASS__, 'get_shared_settings' ) );
		add_filter( 'woocommerce_shared_settings', array( __CLASS__, 'get_block_settings' ) );
		add_action( 'body_class', array( __CLASS__, 'add_theme_body_class' ), 1 );
	}

	/**
	 * Register block scripts & styles.
	 */
	public static function register_assets() {
		self::register_style( 'wc-block-editor', plugins_url( 'build/editor.css', __DIR__ ), array( 'wp-edit-blocks' ) );
		self::register_style( 'wc-block-style', plugins_url( 'build/style.css', __DIR__ ), [] );

		// Shared libraries and components across all blocks.
		self::register_script( 'wc-blocks', plugins_url( 'build/blocks.js', __DIR__ ), [], false );
		self::register_script( 'wc-vendors', plugins_url( 'build/vendors.js', __DIR__ ), [], false );

		// Individual blocks.
		self::register_script( 'wc-handpicked-products', plugins_url( 'build/handpicked-products.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-product-best-sellers', plugins_url( 'build/product-best-sellers.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-product-category', plugins_url( 'build/product-category.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-product-new', plugins_url( 'build/product-new.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-product-on-sale', plugins_url( 'build/product-on-sale.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-product-top-rated', plugins_url( 'build/product-top-rated.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-products-by-attribute', plugins_url( 'build/products-by-attribute.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-featured-product', plugins_url( 'build/featured-product.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-featured-category', plugins_url( 'build/featured-category.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-product-categories', plugins_url( 'build/product-categories.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-product-tag', plugins_url( 'build/product-tag.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-all-reviews', plugins_url( 'build/all-reviews.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-reviews-by-product', plugins_url( 'build/reviews-by-product.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-reviews-by-category', plugins_url( 'build/reviews-by-category.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
		self::register_script( 'wc-product-search', plugins_url( 'build/product-search.js', __DIR__ ), array( 'wc-vendors', 'wc-blocks' ) );
	}

	/**
	 * Attach data to registered assets using inline scripts.
	 */
	public static function maybe_add_asset_data() {
		if ( wp_script_is( 'wc-vendors', 'enqueued' ) && ! did_action( 'woocommerce_shared_settings' ) ) {
			wp_add_inline_script(
				'wc-vendors',
				self::shared_settings_data(),
				'before'
			);
		}
	}

	/**
	 * Add body classes.
	 *
	 * @param array $classes Array of CSS classnames.
	 * @return array Modified array of CSS classnames.
	 */
	public static function add_theme_body_class( $classes = [] ) {
		$classes[] = 'theme-' . get_template();
		return $classes;
	}

	/**
	 * Renders the shared settings inline script.
	 */
	public static function shared_settings_data() {
		/**
		 * Plugins should register settings needed in their app via this filter.
		 *
		 * @internal This filter can run in both admin and frontend context so ensure you check methods are available to use in any given context.
		 * @internal The woocommerce/settings package will export all settings declared here.
		 * @param $settings array Array of settings.
		 */
		$settings = apply_filters( 'woocommerce_shared_settings', array() );

		return "var wcSharedSettings = wcSharedSettings || JSON.parse( decodeURIComponent( '" . rawurlencode( wp_json_encode( $settings ) ) . "' ) );";
	}

	/**
	 * Defines a list of shared settings which are exposed by @woocommerce/shared-settings package.
	 *
	 * @internal This code will likely be duplicated between wc-admin, blocks, and woo core to ensure values are present. Once in core, this can be trimmed down.
	 * @param array $settings Array of settings to expose for JS apps.
	 * @return array
	 */
	public static function get_shared_settings( $settings ) {
		global $wp_locale;

		$currency = get_woocommerce_currency();
		$settings = array_merge(
			$settings,
			array(
				'adminUrl'      => admin_url(),
				'countries'     => WC()->countries->get_countries(),
				'currency'      => array(
					'code'              => $currency,
					'precision'         => wc_get_price_decimals(),
					'symbol'            => html_entity_decode( get_woocommerce_currency_symbol( $currency ) ),
					'symbolPosition'    => get_option( 'woocommerce_currency_pos' ),
					'decimalSeparator'  => wc_get_price_decimal_separator(),
					'thousandSeparator' => wc_get_price_thousand_separator(),
					'priceFormat'       => html_entity_decode( get_woocommerce_price_format() ),
				),
				'locale'        => array(
					'siteLocale'    => get_locale(),
					'userLocale'    => get_user_locale(),
					'weekdaysShort' => array_values( $wp_locale->weekday_abbrev ),
				),
				'orderStatuses' => self::get_order_statuses( wc_get_order_statuses() ),
				'siteTitle'     => get_bloginfo( 'name' ),
				'wcAssetUrl'    => plugins_url( 'assets/', WC_PLUGIN_FILE ),
			)
		);
		return $settings;
	}

	/**
	 * Format order statuses by removing a leading 'wc-' if present.
	 *
	 * @param array $statuses Order statuses.
	 * @return array formatted statuses.
	 */
	public static function get_order_statuses( $statuses ) {
		$formatted_statuses = array();
		foreach ( $statuses as $key => $value ) {
			$formatted_key                        = preg_replace( '/^wc-/', '', $key );
			$formatted_statuses[ $formatted_key ] = $value;
		}
		return $formatted_statuses;
	}

	/**
	 * Returns block-related data for the wcSharedSettings global.
	 *
	 * This is used to map site settings & data into JS-accessible variables.
	 *
	 * @param array $settings Array of settings to expose for JS apps.
	 * @return array
	 */
	public static function get_block_settings( $settings ) {
		$tag_count          = wp_count_terms( 'product_tag' );
		$product_counts     = wp_count_posts( 'product' );
		$product_categories = get_terms(
			'product_cat',
			array(
				'hide_empty' => false,
				'pad_counts' => true,
			)
		);
		foreach ( $product_categories as &$category ) {
			$category->link = get_term_link( $category->term_id, 'product_cat' );
		}

		$settings = array_merge(
			$settings,
			array(
				'min_columns'        => wc_get_theme_support( 'product_blocks::min_columns', 1 ),
				'max_columns'        => wc_get_theme_support( 'product_blocks::max_columns', 6 ),
				'default_columns'    => wc_get_theme_support( 'product_blocks::default_columns', 3 ),
				'min_rows'           => wc_get_theme_support( 'product_blocks::min_rows', 1 ),
				'max_rows'           => wc_get_theme_support( 'product_blocks::max_rows', 6 ),
				'default_rows'       => wc_get_theme_support( 'product_blocks::default_rows', 1 ),
				'thumbnail_size'     => wc_get_theme_support( 'thumbnail_image_width', 300 ),
				'placeholderImgSrc'  => wc_placeholder_img_src(),
				'min_height'         => wc_get_theme_support( 'featured_block::min_height', 500 ),
				'default_height'     => wc_get_theme_support( 'featured_block::default_height', 500 ),
				'isLargeCatalog'     => $product_counts->publish > 200,
				'limitTags'          => $tag_count > 100,
				'hasTags'            => $tag_count > 0,
				'productCategories'  => $product_categories,
				'homeUrl'            => esc_js( home_url( '/' ) ),
				'showAvatars'        => '1' === get_option( 'show_avatars' ),
				'enableReviewRating' => 'yes' === get_option( 'woocommerce_enable_review_rating' ),
			)
		);

		return $settings;
	}

	/**
	 * Get the file modified time as a cache buster if we're in dev mode.
	 *
	 * @param string $file Local path to the file.
	 * @return string The cache buster value to use for the given file.
	 */
	protected static function get_file_version( $file ) {
		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$file = trim( $file, '/' );
			return filemtime( \Automattic\WooCommerce\Blocks\Package::get_path() . '/' . $file );
		}
		return \Automattic\WooCommerce\Blocks\Package::get_version();
	}

	/**
	 * Registers a script according to `wp_register_script`, additionally loading the translations for the file.
	 *
	 * @since 2.0.0
	 *
	 * @param string $handle    Name of the script. Should be unique.
	 * @param string $src       Full URL of the script, or path of the script relative to the WordPress root directory.
	 * @param array  $deps      Optional. An array of registered script handles this script depends on. Default empty array.
	 * @param bool   $has_i18n  Optional. Whether to add a script translation call to this file. Default 'true'.
	 */
	protected static function register_script( $handle, $src, $deps = [], $has_i18n = true ) {
		$filename     = str_replace( plugins_url( '/', __DIR__ ), '', $src );
		$ver          = self::get_file_version( $filename );
		$deps_path    = dirname( __DIR__ ) . '/' . str_replace( '.js', '.deps.json', $filename );
		$dependencies = file_exists( $deps_path ) ? json_decode( file_get_contents( $deps_path ) ) : []; // phpcs:ignore WordPress.WP.AlternativeFunctions
		$dependencies = array_merge( $dependencies, $deps );

		wp_register_script( $handle, $src, $dependencies, $ver, true );
		if ( $has_i18n && function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( $handle, 'woo-gutenberg-products-block', dirname( __DIR__ ) . '/languages' );
		}
	}

	/**
	 * Queues a block script.
	 *
	 * @since 2.3.0
	 *
	 * @param string $name Name of the script used to identify the file inside build folder.
	 */
	public static function register_block_script( $name ) {
		$filename = 'build/' . $name . '.js';
		self::register_script( 'wc-' . $name, plugins_url( $filename, __DIR__ ) );
		wp_enqueue_script( 'wc-' . $name );
	}

	/**
	 * Registers a style according to `wp_register_style`.
	 *
	 * @since 2.0.0
	 *
	 * @param string $handle Name of the stylesheet. Should be unique.
	 * @param string $src    Full URL of the stylesheet, or path of the stylesheet relative to the WordPress root directory.
	 * @param array  $deps   Optional. An array of registered stylesheet handles this stylesheet depends on. Default empty array.
	 * @param string $media  Optional. The media for which this stylesheet has been defined. Default 'all'. Accepts media types like
	 *                       'all', 'print' and 'screen', or media queries like '(orientation: portrait)' and '(max-width: 640px)'.
	 */
	protected static function register_style( $handle, $src, $deps = [], $media = 'all' ) {
		$filename = str_replace( plugins_url( '/', __DIR__ ), '', $src );
		$ver      = self::get_file_version( $filename );
		wp_register_style( $handle, $src, $deps, $ver, $media );
	}
}
