<?php
/**
 * Register the scripts, styles, and blocks needed for the block editor.
 * NOTE: DO NOT edit this file in WooCommerce core, this is generated from woocommerce-gutenberg-products-block.
 *
 * @package WooCommerce\Blocks
 * @version 2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * WGPB_Block_Library Class.
 */
class WGPB_Block_Library {

	/**
	 * Get the file modified time as a cache buster if we're in dev mode.
	 *
	 * @param string $file Local path to the file.
	 * @return string The cache buster value to use for the given file.
	 */
	protected static function get_file_version( $file ) {
		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$file = trim( $file, '/' );
			return filemtime( WGPB_ABSPATH . $file );
		}
		return WGPB_VERSION;
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
	protected static function register_script( $handle, $src, $deps = array(), $has_i18n = true ) {
		$filename = str_replace( plugins_url( '/', WGPB_PLUGIN_FILE ), '', $src );
		$ver      = self::get_file_version( $filename );
		wp_register_script( $handle, $src, $deps, $ver, true );
		if ( $has_i18n && function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( $handle, 'woo-gutenberg-products-block', WGPB_ABSPATH . 'languages' );
		}
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
	protected static function register_style( $handle, $src, $deps = array(), $media = 'all' ) {
		$filename = str_replace( plugins_url( '/', WGPB_PLUGIN_FILE ), '', $src );
		$ver      = self::get_file_version( $filename );
		wp_register_style( $handle, $src, $deps, $ver, $media );
	}

	/**
	 * Register block scripts & styles.
	 *
	 * @since 2.0.0
	 */
	public static function register_assets() {
		self::register_style( 'wc-block-editor', plugins_url( 'build/editor.css', WGPB_PLUGIN_FILE ), array( 'wp-edit-blocks' ) );
		self::register_style( 'wc-block-style', plugins_url( 'build/style.css', WGPB_PLUGIN_FILE ), array() );

		// Shared libraries and components across all blocks.
		self::register_script( 'wc-vendors', plugins_url( 'build/vendors.js', WGPB_PLUGIN_FILE ), array(), false );

		$block_dependencies = array(
			'wp-api-fetch',
			'wp-blocks',
			'wp-components',
			'wp-compose',
			'wp-data',
			'wp-element',
			'wp-editor',
			'wp-i18n',
			'wp-url',
			'lodash',
			'wc-vendors',
		);

		self::register_script( 'wc-handpicked-products', plugins_url( 'build/handpicked-products.js', WGPB_PLUGIN_FILE ), $block_dependencies );
		self::register_script( 'wc-product-best-sellers', plugins_url( 'build/product-best-sellers.js', WGPB_PLUGIN_FILE ), $block_dependencies );
		self::register_script( 'wc-product-category', plugins_url( 'build/product-category.js', WGPB_PLUGIN_FILE ), $block_dependencies );
		self::register_script( 'wc-product-new', plugins_url( 'build/product-new.js', WGPB_PLUGIN_FILE ), $block_dependencies );
		self::register_script( 'wc-product-on-sale', plugins_url( 'build/product-on-sale.js', WGPB_PLUGIN_FILE ), $block_dependencies );
		self::register_script( 'wc-product-top-rated', plugins_url( 'build/product-top-rated.js', WGPB_PLUGIN_FILE ), $block_dependencies );
		self::register_script( 'wc-products-attribute', plugins_url( 'build/products-attribute.js', WGPB_PLUGIN_FILE ), $block_dependencies );
		self::register_script( 'wc-featured-product', plugins_url( 'build/featured-product.js', WGPB_PLUGIN_FILE ), $block_dependencies );
	}

	/**
	 * Register blocks, hooking up assets and render functions as needed.
	 *
	 * @since 2.0.0
	 */
	public static function register_blocks() {
		require_once dirname( __FILE__ ) . '/class-wgpb-block-featured-product.php';

		register_block_type(
			'woocommerce/handpicked-products',
			array(
				'editor_script' => 'wc-handpicked-products',
				'editor_style'  => 'wc-block-editor',
				'style'         => 'wc-block-style',
			)
		);
		register_block_type(
			'woocommerce/product-best-sellers',
			array(
				'editor_script' => 'wc-product-best-sellers',
				'editor_style'  => 'wc-block-editor',
				'style'         => 'wc-block-style',
			)
		);
		register_block_type(
			'woocommerce/product-category',
			array(
				'editor_script' => 'wc-product-category',
				'editor_style'  => 'wc-block-editor',
				'style'         => 'wc-block-style',
			)
		);
		register_block_type(
			'woocommerce/product-new',
			array(
				'editor_script' => 'wc-product-new',
				'editor_style'  => 'wc-block-editor',
				'style'         => 'wc-block-style',
			)
		);
		register_block_type(
			'woocommerce/product-on-sale',
			array(
				'editor_script' => 'wc-product-on-sale',
				'editor_style'  => 'wc-block-editor',
				'style'         => 'wc-block-style',
			)
		);
		register_block_type(
			'woocommerce/product-top-rated',
			array(
				'editor_script' => 'wc-product-top-rated',
				'editor_style'  => 'wc-block-editor',
				'style'         => 'wc-block-style',
			)
		);
		register_block_type(
			'woocommerce/products-by-attribute',
			array(
				'editor_script' => 'wc-products-attribute',
				'editor_style'  => 'wc-block-editor',
				'style'         => 'wc-block-style',
			)
		);
		register_block_type(
			'woocommerce/featured-product',
			array(
				'render_callback' => array( 'WGPB_Block_Featured_Product', 'render' ),
				'editor_script'   => 'wc-featured-product',
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
			)
		);
	}

	/**
	 * Adds a WooCommerce category to the block inserter.
	 *
	 * @since 2.0.0
	 *
	 * @param array $categories Array of categories.
	 * @return array Array of block categories.
	 */
	public static function add_block_category( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'woocommerce',
					'title' => __( 'WooCommerce', 'woo-gutenberg-products-block' ),
					'icon'  => 'woocommerce',
				),
			)
		);
	}

	/**
	 * Output useful globals before printing any script tags.
	 *
	 * These are used by @woocommerce/components & the block library to set up defaults
	 * based on user-controlled settings from WordPress.
	 *
	 * @since 2.0.0
	 */
	public static function print_script_settings() {
		global $wp_locale;
		$code = get_woocommerce_currency();
		// NOTE: wcSettings is not used directly, it's only for @woocommerce/components
		//
		// Settings and variables can be passed here for access in the app.
		// Will need `wcAdminAssetUrl` if the ImageAsset component is used.
		// Will need `dataEndpoints.countries` if Search component is used with 'country' type.
		// Will need `orderStatuses` if the OrderStatus component is used.
		// Deliberately excluding: `embedBreadcrumbs`, `trackingEnabled`.
		$settings = array(
			'adminUrl'      => admin_url(),
			'wcAssetUrl'    => plugins_url( 'assets/', WC_PLUGIN_FILE ),
			'siteLocale'    => esc_attr( get_bloginfo( 'language' ) ),
			'currency'      => array(
				'code'      => $code,
				'precision' => wc_get_price_decimals(),
				'symbol'    => get_woocommerce_currency_symbol( $code ),
				'position'  => get_option( 'woocommerce_currency_pos' ),
			),
			'stockStatuses' => wc_get_product_stock_status_options(),
			'siteTitle'     => get_bloginfo( 'name' ),
			'dataEndpoints' => array(),
			'l10n'          => array(
				'userLocale'    => get_user_locale(),
				'weekdaysShort' => array_values( $wp_locale->weekday_abbrev ),
			),
		);
		// NOTE: wcSettings is not used directly, it's only for @woocommerce/components.
		$settings = apply_filters( 'woocommerce_components_settings', $settings );

		// Global settings used in each block.
		$block_settings = array(
			'min_columns'       => wc_get_theme_support( 'product_grid::min_columns', 1 ),
			'max_columns'       => wc_get_theme_support( 'product_grid::max_columns', 6 ),
			'default_columns'   => wc_get_default_products_per_row(),
			'min_rows'          => wc_get_theme_support( 'product_grid::min_rows', 1 ),
			'max_rows'          => wc_get_theme_support( 'product_grid::max_rows', 6 ),
			'default_rows'      => wc_get_default_product_rows_per_page(),
			'placeholderImgSrc' => wc_placeholder_img_src(),
			'min_height'        => wc_get_theme_support( 'featured_block::min_height', 500 ),
			'default_height'    => wc_get_theme_support( 'featured_block::default_height', 500 ),
		);
		?>
		<script type="text/javascript">
			var wcSettings = wcSettings || JSON.parse( decodeURIComponent( '<?php echo rawurlencode( wp_json_encode( $settings ) ); ?>' ) );
			var wc_product_block_data = JSON.parse( decodeURIComponent( '<?php echo rawurlencode( wp_json_encode( $block_settings ) ); ?>' ) );
		</script>
		<?php
	}
}

if ( function_exists( 'register_block_type' ) ) {
	add_action( 'init', array( 'WGPB_Block_Library', 'register_blocks' ) );
	add_action( 'init', array( 'WGPB_Block_Library', 'register_assets' ) );
	add_filter( 'block_categories', array( 'WGPB_Block_Library', 'add_block_category' ) );
	add_action( 'admin_print_footer_scripts', array( 'WGPB_Block_Library', 'print_script_settings' ), 1 );
}
