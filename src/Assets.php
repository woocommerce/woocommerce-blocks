<?php
/**
 * Initializes block assets.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\Utilities\SingletonTrait;

/**
 * Assets class.
 */
class Assets {
	use SingletonTrait;

	/**
	 * Initialize class features.
	 */
	public function init() {
		add_action( 'init', array( $this, 'register_assets' ) );
		add_action( 'body_class', array( $this, 'add_theme_body_class' ), 1 );
		add_action( 'admin_print_footer_scripts', array( $this, 'print_script_settings' ), 1 );
	}

	/**
	 * Add body classes.
	 *
	 * @param array $classes Array of CSS classnames.
	 * @return array Modified array of CSS classnames.
	 */
	public function add_theme_body_class( $classes = array() ) {
		$classes[] = 'theme-' . get_template();
		return $classes;
	}

	/**
	 * Register block scripts & styles.
	 *
	 * @since 2.0.0
	 */
	public function register_assets() {
		$this->register_style( 'wc-block-editor', plugins_url( 'build/editor.css', WGPB_ABSPATH ), array( 'wp-edit-blocks' ) );
		$this->register_style( 'wc-block-style', plugins_url( 'build/style.css', WGPB_ABSPATH ), array() );

		// Shared libraries and components across all blocks.
		$this->register_script( 'wc-blocks', plugins_url( 'build/blocks.js', WGPB_ABSPATH ), array(), false );
		$this->register_script( 'wc-vendors', plugins_url( 'build/vendors.js', WGPB_ABSPATH ), array(), false );

		$block_dependencies = array(
			'wp-api-fetch',
			'wp-blocks',
			'wp-components',
			'wp-compose',
			'wp-data',
			'wp-date',
			'wp-dom',
			'wp-element',
			'wp-editor',
			'wp-hooks',
			'wp-i18n',
			'wp-url',
			'lodash',
			'wc-blocks',
			'wc-vendors',
		);

		$this->register_script( 'wc-handpicked-products', plugins_url( 'build/handpicked-products.js', WGPB_ABSPATH ), $block_dependencies );
		$this->register_script( 'wc-product-best-sellers', plugins_url( 'build/product-best-sellers.js', WGPB_ABSPATH ), $block_dependencies );
		$this->register_script( 'wc-product-category', plugins_url( 'build/product-category.js', WGPB_ABSPATH ), $block_dependencies );
		$this->register_script( 'wc-product-new', plugins_url( 'build/product-new.js', WGPB_ABSPATH ), $block_dependencies );
		$this->register_script( 'wc-product-on-sale', plugins_url( 'build/product-on-sale.js', WGPB_ABSPATH ), $block_dependencies );
		$this->register_script( 'wc-product-top-rated', plugins_url( 'build/product-top-rated.js', WGPB_ABSPATH ), $block_dependencies );
		$this->register_script( 'wc-products-by-attribute', plugins_url( 'build/products-attribute.js', WGPB_ABSPATH ), $block_dependencies );
		$this->register_script( 'wc-featured-product', plugins_url( 'build/featured-product.js', WGPB_ABSPATH ), $block_dependencies );
	}

	/**
	 * Get the file modified time as a cache buster if we're in dev mode.
	 *
	 * @param string $file Local path to the file.
	 * @return string The cache buster value to use for the given file.
	 */
	protected function get_file_version( $file ) {
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
	protected function register_script( $handle, $src, $deps = array(), $has_i18n = true ) {
		$filename = str_replace( plugins_url( '/', WGPB_ABSPATH ), '', $src );
		$ver      = $this->get_file_version( $filename );
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
	protected function register_style( $handle, $src, $deps = array(), $media = 'all' ) {
		$filename = str_replace( plugins_url( '/', WGPB_ABSPATH ), '', $src );
		$ver      = $this->get_file_version( $filename );
		wp_register_style( $handle, $src, $deps, $ver, $media );
	}

	/**
	 * Output useful globals before printing any script tags.
	 *
	 * These are used by @woocommerce/components & the block library to set up defaults
	 * based on user-controlled settings from WordPress.
	 *
	 * @since 2.0.0
	 */
	public function print_script_settings() {
		global $wp_locale;
		$code           = get_woocommerce_currency();
		$product_counts = wp_count_posts( 'product' );

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
			'min_columns'       => wc_get_theme_support( 'product_blocks::min_columns', 1 ),
			'max_columns'       => wc_get_theme_support( 'product_blocks::max_columns', 6 ),
			'default_columns'   => wc_get_theme_support( 'product_blocks::default_columns', 3 ),
			'min_rows'          => wc_get_theme_support( 'product_blocks::min_rows', 1 ),
			'max_rows'          => wc_get_theme_support( 'product_blocks::max_rows', 6 ),
			'default_rows'      => wc_get_theme_support( 'product_blocks::default_rows', 1 ),
			'thumbnail_size'    => wc_get_theme_support( 'thumbnail_image_width', 300 ),
			'placeholderImgSrc' => wc_placeholder_img_src(),
			'min_height'        => wc_get_theme_support( 'featured_block::min_height', 500 ),
			'default_height'    => wc_get_theme_support( 'featured_block::default_height', 500 ),
			'isLargeCatalog'    => $product_counts->publish > 200,
		);
		?>
		<script type="text/javascript">
			var wcSettings = wcSettings || JSON.parse( decodeURIComponent( '<?php echo rawurlencode( wp_json_encode( $settings ) ); ?>' ) );
			var wc_product_block_data = JSON.parse( decodeURIComponent( '<?php echo rawurlencode( wp_json_encode( $block_settings ) ); ?>' ) );
		</script>
		<?php
	}
}
