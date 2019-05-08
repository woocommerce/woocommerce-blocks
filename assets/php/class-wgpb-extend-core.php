<?php
/**
 * Extend core/WC Rest API with new functionality.
 *
 * Changes here should be moved to core before merging blocks into a core release.
 *
 * @package WooCommerce\Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * WGPB_Extend_Core Class.
 */
class WGPB_Extend_Core {

	/**
	 * Class instance.
	 *
	 * @var WGPB_Rest_API instance
	 */
	protected static $instance = null;

	/**
	 * Get class instance.
	 *
	 * @return WGPB_Extend_Core instance.
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
		add_action( 'init', array( $this, 'init' ) );
	}

	/**
	 * Init - register hooks.
	 */
	public function init() {
		add_action( 'rest_api_init', array( $this, 'override_product_api_controller' ), 20 );
		add_filter( 'shortcode_atts_products', array( $this, 'products_shortcode_allow_unregistered_atts' ), 10, 3 );
		add_filter( 'woocommerce_shortcode_products_query', array( $this, 'products_shortcode_support_tag_ids' ), 10, 2 );
	}

	/**
	 * On rest API Init, replace core endpoints with custom ones.
	 */
	public function override_product_api_controller() {
		require_once WGPB_ABSPATH . 'assets/php/api/class-wc-rest-blocks-products-controller-v2.php';

		// Replace the products controller in woo core.
		wc()->api->WC_REST_Blocks_Products_Controller = new WC_REST_Blocks_Products_Controller_V2();
		wc()->api->WC_REST_Blocks_Products_Controller->register_routes();
	}

	/**
	 * Prevent shotrcode_atts from removing the custom tag_ids and tag_operator parameters.
	 *
	 * @internal This code won't be needed when these parameters are added to core WC_Shortcode_Products::parse_attributes.
	 *
	 * @param array $out   The output array of shortcode attributes.
	 * @param array $pairs The supported attributes and their defaults.
	 * @param array $atts  The user defined shortcode attributes.
	 * @return array
	 */
	public function products_shortcode_allow_unregistered_atts( $out, $pairs, $atts ) {
		$out['tag_ids']      = isset( $atts['tag_ids'] ) ? $atts['tag_ids'] : null;
		$out['tag_operator'] = isset( $atts['tag_operator'] ) ? $atts['tag_operator'] : null;
		return $out;
	}

	/**
	 * Add support for tag IDs to the products shortcode.
	 *
	 * @param array $query_args Array of query args for WordPress.
	 * @param array $attributes Array of options for the shortcode.
	 * @return array Modified query args.
	 */
	public function products_shortcode_support_tag_ids( $query_args, $attributes ) {
		if ( isset( $attributes['tag_ids'] ) ) {
			$query_args['tax_query'][] = array(
				'taxonomy' => 'product_tag',
				'terms'    => array_map( 'absint', explode( ',', $attributes['tag_ids'] ) ),
				'field'    => 'id',
				'operator' => isset( $attributes['tag_operator'] ) ? $attributes['tag_operator'] : 'IN',
			);
		}
		return $query_args;
	}
}
WGPB_Extend_Core::get_instance();
