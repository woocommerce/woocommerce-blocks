<?php
/**
 * Plugin Name: WooCommerce Blocks
 * Plugin URI: https://github.com/woocommerce/woocommerce-gutenberg-products-block
 * Description: WooCommerce blocks for the Gutenberg editor.
 * Version: 2.0.0-dev
 * Author: Automattic
 * Author URI: https://woocommerce.com
 * Text Domain:  woo-gutenberg-products-block
 * WC requires at least: 3.5
 * WC tested up to: 3.6
 *
 * @package WooCommerce\Blocks
 */

defined( 'ABSPATH' ) || die();

define( 'WGPB_VERSION', '2.0.0-dev' );

define( 'WGPB_DEVELOPMENT_MODE', true );

/**
 * Load up the assets if Gutenberg is active.
 */
function wgpb_initialize() {
	$files_exist = file_exists( plugin_dir_path( __FILE__ ) . '/build/featured-product.js' );

	if ( $files_exist && function_exists( 'register_block_type' ) ) {
		add_action( 'init', 'wgpb_register_blocks' );
		add_action( 'init', 'wgpb_register_scripts' );
		add_filter( 'block_categories', 'wgpb_add_block_category' );
	}

	if ( defined( 'WGPB_DEVELOPMENT_MODE' ) && WGPB_DEVELOPMENT_MODE && ! $files_exist ) {
		add_action( 'admin_notices', 'wgpb_plugins_notice' );
	}

	add_action( 'rest_api_init', 'wgpb_register_api_routes' );
}
add_action( 'woocommerce_loaded', 'wgpb_initialize' );

/**
 * Display a warning about building files.
 */
function wgpb_plugins_notice() {
	echo '<div class="error"><p>';
	printf(
		/* Translators: %1$s is the install command, %2$s is the build command, %3$s is the watch command. */
		esc_html__( 'WooCommerce Blocks development mode requires files to be built. From the plugin directory, run %1$s to install dependencies, %2$s to build the files or %3$s to build the files and watch for changes.', 'woo-gutenberg-products-block' ),
		'<code>npm install</code>',
		'<code>npm run build</code>',
		'<code>npm start</code>'
	);
	echo '</p></div>';
}

/**
 * Adds a WooCommerce category to the block inserter.
 *
 * @param array $categories Array of categories.
 * @return array Array of block categories.
 */
function wgpb_add_block_category( $categories ) {
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
 * Register the Products block and its scripts.
 */
function wgpb_register_blocks() {
	include_once dirname( __FILE__ ) . '/includes/blocks/class-wc-block-featured-product.php';

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
			'render_callback' => array( 'WC_Block_Featured_Product', 'render' ),
			'editor_script'   => 'wc-featured-product',
			'editor_style'    => 'wc-block-editor',
			'style'           => 'wc-block-style',
		)
	);
}

/**
 * Register extra scripts needed.
 */
function wgpb_register_scripts() {
	if ( ! function_exists( 'wc_get_theme_support' ) ) {
		return;
	}

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

	wp_register_script(
		'wc-vendors',
		plugins_url( 'build/vendors.js', __FILE__ ),
		array(),
		wgpb_get_file_version( '/build/vendors.js' ),
		true
	);

	wp_register_style(
		'wc-block-editor',
		plugins_url( 'build/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		wgpb_get_file_version( '/build/editor.css' )
	);

	wp_register_style(
		'wc-block-style',
		plugins_url( 'build/style.css', __FILE__ ),
		array(),
		wgpb_get_file_version( '/build/style.css' )
	);

	wp_register_script(
		'wc-handpicked-products',
		plugins_url( 'build/handpicked-products.js', __FILE__ ),
		$block_dependencies,
		wgpb_get_file_version( '/build/handpicked-products.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'wc-handpicked-products', 'woo-gutenberg-products-block', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	wp_register_script(
		'wc-product-best-sellers',
		plugins_url( 'build/product-best-sellers.js', __FILE__ ),
		$block_dependencies,
		wgpb_get_file_version( '/build/product-best-sellers.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'wc-product-best-sellers', 'woo-gutenberg-products-block', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	wp_register_script(
		'wc-product-category',
		plugins_url( 'build/product-category.js', __FILE__ ),
		$block_dependencies,
		wgpb_get_file_version( '/build/product-category.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'wc-product-category', 'woo-gutenberg-products-block', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	wp_register_script(
		'wc-product-new',
		plugins_url( 'build/product-new.js', __FILE__ ),
		$block_dependencies,
		wgpb_get_file_version( '/build/product-new.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'wc-product-new', 'woo-gutenberg-products-block', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	wp_register_script(
		'wc-product-on-sale',
		plugins_url( 'build/product-on-sale.js', __FILE__ ),
		$block_dependencies,
		wgpb_get_file_version( '/build/product-on-sale.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'wc-product-on-sale', 'woo-gutenberg-products-block', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	wp_register_script(
		'wc-product-top-rated',
		plugins_url( 'build/product-top-rated.js', __FILE__ ),
		$block_dependencies,
		wgpb_get_file_version( '/build/product-top-rated.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'wc-product-top-rated', 'woo-gutenberg-products-block', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	wp_register_script(
		'wc-featured-product',
		plugins_url( 'build/featured-product.js', __FILE__ ),
		$block_dependencies,
		wgpb_get_file_version( '/build/featured-product.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'wc-featured-product', 'woo-gutenberg-products-block', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	wp_register_script(
		'wc-products-attribute',
		plugins_url( 'build/products-attribute.js', __FILE__ ),
		$block_dependencies,
		wgpb_get_file_version( '/build/products-attribute.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'wc-products-attribute', 'woo-gutenberg-products-block', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	add_action( 'admin_print_footer_scripts', 'wgpb_print_script_settings', 1 );
}

/**
 * Get the file modified time as a cache buster if we're in dev mode.
 *
 * @param string $file Local path to the file.
 * @return string The cache buster value to use for the given file.
 */
function wgpb_get_file_version( $file ) {
	if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
		$file = trim( $file, '/' );
		return filemtime( plugin_dir_path( __FILE__ ) . $file );
	}
	return WGPB_VERSION;
}

/**
 * Output the wcSettings global before printing any script tags.
 */
function wgpb_print_script_settings() {
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
		<?php // Use the wcSettings from wc-admin if already present. ?>
		var wcSettings = wcSettings || <?php echo wp_json_encode( $settings ); ?>;
		var wc_product_block_data = <?php echo wp_json_encode( $block_settings ); ?>;
	</script>
	<?php
}

/**
 * Register extra API routes with functionality specific for product blocks.
 */
function wgpb_register_api_routes() {
	include_once dirname( __FILE__ ) . '/includes/class-wgpb-products-controller.php';
	include_once dirname( __FILE__ ) . '/includes/class-wgpb-product-categories-controller.php';
	include_once dirname( __FILE__ ) . '/includes/class-wgpb-product-attributes-controller.php';
	include_once dirname( __FILE__ ) . '/includes/class-wgpb-product-attribute-terms-controller.php';

	$products = new WGPB_Products_Controller();
	$products->register_routes();

	$categories = new WGPB_Product_Categories_Controller();
	$categories->register_routes();

	$attributes = new WGPB_Product_Attributes_Controller();
	$attributes->register_routes();

	$attribute_terms = new WGPB_Product_Attribute_Terms_Controller();
	$attribute_terms->register_routes();
}
