<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\BlockTypes\AtomicBlock;
use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;
use Automattic\WooCommerce\Blocks\Integrations\IntegrationRegistry;
use Automattic\WooCommerce\Blocks\BlockTypes\Cart;
use Automattic\WooCommerce\Blocks\BlockTypes\Checkout;

/**
 * BlockTypesController class.
 *
 * @since 5.0.0
 * @internal
 */
final class BlockTypesController {

	/**
	 * Instance of the asset API.
	 *
	 * @var AssetApi
	 */
	protected $asset_api;

	/**
	 * Instance of the asset data registry.
	 *
	 * @var AssetDataRegistry
	 */
	protected $asset_data_registry;

	/**
	 * Constructor.
	 *
	 * @param AssetApi          $asset_api Instance of the asset API.
	 * @param AssetDataRegistry $asset_data_registry Instance of the asset data registry.
	 */
	public function __construct( AssetApi $asset_api, AssetDataRegistry $asset_data_registry ) {
		$this->asset_api           = $asset_api;
		$this->asset_data_registry = $asset_data_registry;
		$this->init();
	}

	/**
	 * Initialize class features.
	 */
	protected function init() {
		add_action( 'init', array( $this, 'register_blocks' ) );
		add_filter( 'render_block', array( $this, 'add_data_attributes' ), 10, 2 );
		add_action( 'woocommerce_login_form_end', array( $this, 'redirect_to_field' ) );
		add_filter( 'widget_types_to_hide_from_legacy_widget_block', array( $this, 'hide_legacy_widgets_with_block_equivalent' ) );
		add_filter( 'woocommerce_settings_pages', array( $this, 'add_order_received_page_setting' ) );
		add_filter( 'woocommerce_get_checkout_order_received_url', array( $this, 'get_order_received_url' ), 10, 2 );
	}

	/**
	 * Register blocks, hooking up assets and render functions as needed.
	 */
	public function register_blocks() {
		$block_types = $this->get_block_types();

		foreach ( $block_types as $block_type ) {
			$block_type_class    = __NAMESPACE__ . '\\BlockTypes\\' . $block_type;
			$block_type_instance = new $block_type_class( $this->asset_api, $this->asset_data_registry, new IntegrationRegistry() );
		}

	}

	/**
	 * Add data- attributes to blocks when rendered if the block is under the woocommerce/ namespace.
	 *
	 * @param string $content Block content.
	 * @param array  $block Parsed block data.
	 * @return string
	 */
	public function add_data_attributes( $content, $block ) {
		$block_name      = $block['blockName'];
		$block_namespace = strtok( $block_name ?? '', '/' );

		/**
		 * Filters the list of allowed block namespaces.
		 *
		 * This hook defines which block namespaces should have block name and attribute `data-` attributes appended on render.
		 *
		 * @param array $allowed_namespaces List of namespaces.
		 */
		$allowed_namespaces = array_merge( [ 'woocommerce', 'woocommerce-checkout' ], (array) apply_filters( '__experimental_woocommerce_blocks_add_data_attributes_to_namespace', [] ) );

		/**
		 * Filters the list of allowed Block Names
		 *
		 * This hook defines which block names should have block name and attribute data- attributes appended on render.
		 *
		 * @param array $allowed_namespaces List of namespaces.
		 */
		$allowed_blocks = (array) apply_filters( '__experimental_woocommerce_blocks_add_data_attributes_to_block', [] );

		if ( ! in_array( $block_namespace, $allowed_namespaces, true ) && ! in_array( $block_name, $allowed_blocks, true ) ) {
			return $content;
		}

		$attributes              = (array) $block['attrs'];
		$exclude_attributes      = [ 'className', 'align' ];
		$escaped_data_attributes = [
			'data-block-name="' . esc_attr( $block['blockName'] ) . '"',
		];

		foreach ( $attributes as $key => $value ) {
			if ( in_array( $key, $exclude_attributes, true ) ) {
				continue;
			}
			if ( is_bool( $value ) ) {
				$value = $value ? 'true' : 'false';
			}
			if ( ! is_scalar( $value ) ) {
				$value = wp_json_encode( $value );
			}
			$escaped_data_attributes[] = 'data-' . esc_attr( strtolower( preg_replace( '/(?<!\ )[A-Z]/', '-$0', $key ) ) ) . '="' . esc_attr( $value ) . '"';
		}

		return preg_replace( '/^<div /', '<div ' . implode( ' ', $escaped_data_attributes ) . ' ', trim( $content ) );
	}

	/**
	 * Adds a redirect field to the login form so blocks can redirect users after login.
	 */
	public function redirect_to_field() {
		// phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_GET['redirect_to'] ) ) {
			return;
		}
		echo '<input type="hidden" name="redirect" value="' . esc_attr( esc_url_raw( wp_unslash( $_GET['redirect_to'] ) ) ) . '" />'; // phpcs:ignore WordPress.Security.NonceVerification
	}

	/**
	 * Hide legacy widgets with a feature complete block equivalent in the inserter
	 * and prevent them from showing as an option in the Legacy Widget block.
	 *
	 * @param array $widget_types An array of widgets hidden in core.
	 * @return array $widget_types An array inluding the WooCommerce widgets to hide.
	 */
	public function hide_legacy_widgets_with_block_equivalent( $widget_types ) {
		array_push(
			$widget_types,
			'woocommerce_product_search',
			'woocommerce_product_categories',
			'woocommerce_recent_reviews',
			'woocommerce_product_tag_cloud',
			'woocommerce_price_filter',
			'woocommerce_layered_nav',
			'woocommerce_layered_nav_filters',
			'woocommerce_rating_filter'
		);

		return $widget_types;
	}

	/**
	 * Add the order received page to the list of pages in the settings.
	 *
	 * @param array $settings Array of settings.
	 * @return array
	 */
	public function add_order_received_page_setting( $settings ) {
		$pos         = array_search( 'woocommerce_checkout_page_id', array_column( $settings, 'id' ), true ) + 1;
		$new_setting = array(
			'title'    => __( 'Order received page', 'woo-gutenberg-products-block' ),
			'desc'     => __( 'If defined, the customer will be redirected here after checkout instead of the `order-received` endpoint below.', 'woocommerce' ),
			'id'       => 'woocommerce_order_received_page_id',
			'default'  => '',
			'class'    => 'wc-page-search',
			'css'      => 'min-width:300px;',
			'type'     => 'single_select_page_with_search',
			'args'     => array( 'exclude' => [ wc_get_page_id( 'cart' ), wc_get_page_id( 'checkout' ) ] ),
			'desc_tip' => true,
			'autoload' => false,
		);
		return array_merge( array_slice( $settings, 0, $pos ), array( $new_setting ), array_slice( $settings, $pos ) );
	}

	/**
	 * Get custom order received URL.
	 *
	 * @param string    $order_received_url URL to redirect to.
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	public function get_order_received_url( $order_received_url, $order ) {
		$page_id = get_option( 'woocommerce_order_received_page_id', 0 );

		if ( ! $page_id ) {
			return $order_received_url;
		}

		return add_query_arg(
			[
				'order_id' => $order->get_id(),
				'key'      => $order->get_order_key(),
			],
			get_permalink( $page_id )
		);
	}

	/**
	 * Get list of block types.
	 *
	 * @return array
	 */
	protected function get_block_types() {
		global $pagenow;

		$block_types = [
			'ActiveFilters',
			'AllProducts',
			'AllReviews',
			'AttributeFilter',
			'ClassicTemplate',
			'FeaturedCategory',
			'FeaturedProduct',
			'FilterWrapper',
			'HandpickedProducts',
			'MiniCart',
			'MiniCartContents',
			'PriceFilter',
			'ProductAddToCart',
			'ProductBestSellers',
			'ProductButton',
			'ProductCategories',
			'ProductCategory',
			'ProductCategoryList',
			'ProductImage',
			'ProductNew',
			'ProductOnSale',
			'ProductPrice',
			'ProductQuery',
			'ProductRating',
			'ProductSaleBadge',
			'ProductsByAttribute',
			'ProductSearch',
			'ProductSKU',
			'ProductStockIndicator',
			'ProductSummary',
			'ProductTag',
			'ProductTagList',
			'ProductTitle',
			'ProductTopRated',
			'RatingFilter',
			'ReviewsByCategory',
			'ReviewsByProduct',
			'StockFilter',
		];

		$block_types = array_merge( $block_types, Cart::get_cart_block_types(), Checkout::get_checkout_block_types() );

		if ( Package::feature()->is_experimental_build() ) {
			$block_types[] = 'SingleProduct';
			$block_types[] = 'OrderReceivedOrderSummary';
		}

		/**
		 * This disables specific blocks in Widget Areas by not registering them.
		 */
		if ( in_array( $pagenow, [ 'widgets.php', 'themes.php', 'customize.php' ], true ) && ( empty( $_GET['page'] ) || 'gutenberg-edit-site' !== $_GET['page'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
			$block_types = array_diff(
				$block_types,
				[
					'AllProducts',
					'Cart',
					'Checkout',
					'OrderReceivedOrderSummary',
				]
			);
		}

		/**
		 * This disables specific blocks in Post and Page editor by not registering them.
		 */
		if ( in_array( $pagenow, [ 'post.php', 'post-new.php' ], true ) ) {
			$block_types = array_diff(
				$block_types,
				[
					'ClassicTemplate',
				]
			);
		}

		return $block_types;
	}

}
