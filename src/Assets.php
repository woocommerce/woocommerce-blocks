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
	 *
	 * @since $VID:$
	 * Moved most initialization to BootStrap and AssetDataRegistry
	 * classes as a part of ongoing refactor
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register_assets' ) );
		add_action( 'body_class', array( __CLASS__, 'add_theme_body_class' ), 1 );
		add_filter( 'woocommerce_shared_settings', array( __CLASS__, 'get_wc_block_data' ) );
	}

	/**
	 * Register block scripts & styles.
	 *
	 * @since $VID:$
	 * Moved data related enqueuing to new AssetDataRegistry class
	 * as part of ongoing refactoring.
	 */
	public static function register_assets() {
		self::register_style( 'wc-block-editor', plugins_url( 'build/editor.css', __DIR__ ), array( 'wp-edit-blocks' ) );
		wp_style_add_data( 'wc-block-editor', 'rtl', 'replace' );
		self::register_style( 'wc-block-style', plugins_url( 'build/style.css', __DIR__ ), [] );
		wp_style_add_data( 'wc-block-style', 'rtl', 'replace' );

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
	 * Returns block-related data for enqueued wc-block-settings script.
	 *
	 * This is used to map site settings & data into JS-accessible variables.
	 *
	 * @param array $settings The original settings array from the filter.
	 *
	 * @since 2.4.0
	 * @since $VID:$ returned merged data along with incoming $settings
	 */
	public static function get_wc_block_data( $settings ) {
		$tag_count      = wp_count_terms( 'product_tag' );
		$product_counts = wp_count_posts( 'product' );

		// Global settings used in each block.
		return array_merge(
			$settings,
			[
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
				'homeUrl'            => esc_url( home_url( '/' ) ),
				'showAvatars'        => '1' === get_option( 'show_avatars' ),
				'enableReviewRating' => 'yes' === get_option( 'woocommerce_enable_review_rating' ),
			]
		);
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
