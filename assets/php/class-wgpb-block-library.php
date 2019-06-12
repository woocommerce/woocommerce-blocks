<?php
/**
 * Register the scripts, styles, and blocks needed for the block editor.
 * NOTE: DO NOT edit this file in WooCommerce core, this is generated from woocommerce-gutenberg-products-block.
 *
 * @package WooCommerce\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * WGPB_Block_Library Class.
 */
class WGPB_Block_Library {

	/**
	 * Class instance.
	 *
	 * @var WGPB_Block_Library instance
	 */
	protected static $instance = null;

	/**
	 * Get class instance
	 */
	public static function get_instance() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		if ( function_exists( 'register_block_type' ) ) {
			add_action( 'init', array( 'WGPB_Block_Library', 'init' ) );
		}
	}

	/**
	 * Initialize block library features.
	 */
	public static function init() {
		// Shortcut out if we see the feature plugin, v1.4 or below.
		// note: `FP_VERSION` is transformed to `WGPB_VERSION` in the grunt copy task.
		if ( defined( 'FP_VERSION' ) && version_compare( FP_VERSION, '1.4.0', '<=' ) ) {
			return;
		}
		self::register_blocks();
		self::register_assets();
		add_action( 'admin_print_footer_scripts', array( 'WGPB_Block_Library', 'print_script_settings' ), 1 );
		add_action( 'body_class', array( 'WGPB_Block_Library', 'add_theme_body_class' ), 1 );
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
		self::register_script( 'wc-blocks', plugins_url( 'build/blocks.js', WGPB_PLUGIN_FILE ), array(), false );
		self::register_script( 'wc-vendors', plugins_url( 'build/vendors.js', WGPB_PLUGIN_FILE ), array(), false );

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
	 * Output useful globals before printing any script tags.
	 *
	 * These are used by @woocommerce/components & the block library to set up defaults
	 * based on user-controlled settings from WordPress.
	 *
	 * @since 2.0.0
	 */
	public static function print_script_settings() {
		global $wp_locale;
		$code           = get_woocommerce_currency();
		$product_counts = wp_count_posts( 'product' );

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

	/**
	 * Register blocks, hooking up assets and render functions as needed.
	 *
	 * @since 2.0.0
	 */
	public static function register_blocks() {
		require_once dirname( __FILE__ ) . '/class-wgpb-block-grid-base.php';
		require_once dirname( __FILE__ ) . '/class-wgpb-block-featured-product.php';

		register_block_type(
			'woocommerce/handpicked-products',
			array(
				'render_callback' => array( __CLASS__, 'render_handpicked_products' ),
				'editor_script'   => 'wc-handpicked-products',
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'attributes'      => array(
					'align'             => self::get_schema_align(),
					'alignButtons'      => self::get_schema_boolean( false ),
					'columns'           => self::get_schema_number( wc_get_theme_support( 'product_blocks::default_columns', 3 ) ),
					'editMode'          => self::get_schema_boolean( true ),
					'orderby'           => self::get_schema_orderby(),
					'products'          => self::get_schema_list_ids(),
					'contentVisibility' => self::get_schema_content_visibility(),
				),
			)
		);
		register_block_type(
			'woocommerce/product-best-sellers',
			array(
				'render_callback' => array( __CLASS__, 'render_product_best_sellers' ),
				'editor_script'   => 'wc-product-best-sellers',
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'attributes'      => self::get_shared_attributes(),
			)
		);
		register_block_type(
			'woocommerce/product-category',
			array(
				'render_callback' => array( __CLASS__, 'render_product_category' ),
				'editor_script'   => 'wc-product-category',
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'attributes'      => array_merge(
					self::get_shared_attributes(),
					array(
						'orderby'  => self::get_schema_orderby(),
						'editMode' => self::get_schema_boolean( true ),
					)
				),
			)
		);
		register_block_type(
			'woocommerce/product-new',
			array(
				'render_callback' => array( __CLASS__, 'render_product_new' ),
				'editor_script'   => 'wc-product-new',
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'attributes'      => self::get_shared_attributes(),
			)
		);
		register_block_type(
			'woocommerce/product-on-sale',
			array(
				'render_callback' => array( __CLASS__, 'render_product_on_sale' ),
				'editor_script'   => 'wc-product-on-sale',
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'attributes'      => array_merge(
					self::get_shared_attributes(),
					array(
						'orderby' => self::get_schema_orderby(),
					)
				),
			)
		);
		register_block_type(
			'woocommerce/product-top-rated',
			array(
				'render_callback' => array( __CLASS__, 'render_product_top_rated' ),
				'editor_script'   => 'wc-product-top-rated',
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'attributes'      => self::get_shared_attributes(),
			)
		);
		register_block_type(
			'woocommerce/products-by-attribute',
			array(
				'render_callback' => array( __CLASS__, 'render_products_by_attribute' ),
				'editor_script'   => 'wc-products-attribute',
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'attributes'      => array(
					'align'             => self::get_schema_align(),
					'alignButtons'      => self::get_schema_boolean( false ),
					'attributes'        => array(
						'type'    => 'array',
						'items'   => array(
							'type'       => 'object',
							'properties' => array(
								'id'        => array(
									'type' => 'number',
								),
								'attr_slug' => array(
									'type' => 'string',
								),
							),
						),
						'default' => array(),
					),
					'attrOperator'      => array(
						'type'    => 'string',
						'default' => 'any',
					),
					'columns'           => self::get_schema_number( wc_get_theme_support( 'product_blocks::default_columns', 3 ) ),
					'contentVisibility' => self::get_schema_content_visibility(),
					'editMode'          => self::get_schema_boolean( true ),
					'orderby'           => self::get_schema_orderby(),
					'rows'              => self::get_schema_number( wc_get_theme_support( 'product_blocks::default_rows', 1 ) ),
				),
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
	 * Get the schema for the contentVisibility attribute
	 *
	 * @return array List of block attributes with type and defaults.
	 */
	protected static function get_schema_content_visibility() {
		return array(
			'type'       => 'object',
			'properties' => array(
				'title'  => self::get_schema_boolean( true ),
				'price'  => self::get_schema_boolean( true ),
				'rating' => self::get_schema_boolean( true ),
				'button' => self::get_schema_boolean( true ),
			),
		);
	}

	/**
	 * Get the schema for the orderby attribute.
	 *
	 * @return array Property definition of `orderby` attribute.
	 */
	protected static function get_schema_orderby() {
		return array(
			'type'    => 'string',
			'enum'    => array( 'date', 'popularity', 'price_asc', 'price_desc', 'rating', 'title' ),
			'default' => 'date',
		);
	}

	/**
	 * Get the schema for the alignment property.
	 *
	 * @return array Property definition for align.
	 */
	protected static function get_schema_align() {
		return array(
			'type' => 'string',
			'enum' => array( 'left', 'center', 'right', 'wide', 'full' ),
		);
	}

	/**
	 * Get the schema for a list of IDs.
	 *
	 * @return array Property definition for a list of numeric ids.
	 */
	protected static function get_schema_list_ids() {
		return array(
			'type'    => 'array',
			'items'   => array(
				'type' => 'number',
			),
			'default' => array(),
		);
	}

	/**
	 * Get the schema for a boolean value.
	 *
	 * @param  string $default  The default value.
	 * @return array Property definition.
	 */
	protected static function get_schema_boolean( $default = true ) {
		return array(
			'type'    => 'boolean',
			'default' => $default,
		);
	}

	/**
	 * Get the schema for a numeric value.
	 *
	 * @param  string $default  The default value.
	 * @return array Property definition.
	 */
	protected static function get_schema_number( $default ) {
		return array(
			'type'    => 'number',
			'default' => $default,
		);
	}

	/**
	 * Get a set of attributes shared across most of the grid blocks.
	 *
	 * @return array List of block attributes with type and defaults.
	 */
	protected static function get_shared_attributes() {
		return array(
			'columns'           => self::get_schema_number( wc_get_theme_support( 'product_blocks::default_columns', 3 ) ),
			'rows'              => self::get_schema_number( wc_get_theme_support( 'product_blocks::default_rows', 1 ) ),
			'categories'        => self::get_schema_list_ids(),
			'catOperator'       => array(
				'type'    => 'string',
				'default' => 'any',
			),
			'contentVisibility' => self::get_schema_content_visibility(),
			'align'             => self::get_schema_align(),
			'alignButtons'      => self::get_schema_boolean( false ),
		);
	}

	/**
	 * New products: Include and render the dynamic block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public static function render_product_new( $attributes, $content ) {
		require_once dirname( __FILE__ ) . '/class-wgpb-block-product-new.php';

		$block = new WGPB_Block_Product_New( $attributes, $content );
		return $block->render();
	}

	/**
	 * Sale products: Include and render the dynamic block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public static function render_product_on_sale( $attributes, $content ) {
		require_once dirname( __FILE__ ) . '/class-wgpb-block-product-on-sale.php';

		$block = new WGPB_Block_Product_On_Sale( $attributes, $content );
		return $block->render();
	}

	/**
	 * Products by category: Include and render the dynamic block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public static function render_product_category( $attributes, $content ) {
		require_once dirname( __FILE__ ) . '/class-wgpb-block-product-category.php';

		$block = new WGPB_Block_Product_Category( $attributes, $content );
		return $block->render();
	}

	/**
	 * Products by attribute: Include and render the dynamic block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public static function render_products_by_attribute( $attributes, $content ) {
		require_once dirname( __FILE__ ) . '/class-wgpb-block-products-by-attribute.php';

		$block = new WGPB_Block_Products_By_Attribute( $attributes, $content );
		return $block->render();
	}

	/**
	 * Top rated products: Include and render the dynamic block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public static function render_product_top_rated( $attributes, $content ) {
		require_once dirname( __FILE__ ) . '/class-wgpb-block-product-top-rated.php';

		$block = new WGPB_Block_Product_Top_Rated( $attributes, $content );
		return $block->render();
	}

	/**
	 * Best Selling Products: Include and render the dynamic block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public static function render_product_best_sellers( $attributes, $content ) {
		require_once dirname( __FILE__ ) . '/class-wgpb-block-product-best-sellers.php';

		$block = new WGPB_Block_Product_Best_Sellers( $attributes, $content );
		return $block->render();
	}

	/**
	 * Hand-picked Products: Include and render the dynamic block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public static function render_handpicked_products( $attributes, $content ) {
		require_once dirname( __FILE__ ) . '/class-wgpb-block-handpicked-products.php';

		$block = new WGPB_Block_Handpicked_Products( $attributes, $content );
		return $block->render();
	}

	/**
	 * Add body classes.
	 *
	 * @param array $classes Array of CSS classnames.
	 * @return array Modified array of CSS classnames.
	 */
	public static function add_theme_body_class( $classes = array() ) {
		$classes[] = 'theme-' . get_template();
		return $classes;
	}
}

WGPB_Block_Library::get_instance();
