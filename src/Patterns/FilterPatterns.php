<?php

namespace Automattic\WooCommerce\Blocks\Patterns;

/**
 * FilterPatterns class
 */
class FilterPatterns {
	/**
	 * Constructor for class
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'add_filter_patterns' ) );
	}

	/**
	 * Register the patterns and categories.
	 */
	public function add_filter_patterns() {
		register_block_pattern_category(
			'woocommerce',
			array( 'label' => __( 'WooCommerce', 'woo-gutenberg-products-block' ) )
		);

		register_block_pattern(
			'my-plugin/powered-by-wordpress',
			array(
				'title'      => __( 'Powered by WordPress', 'woo-gutenberg-products-block' ),
				'categories' => array( 'woocommerce' ),
				'blockTypes' => array( 'woocommerce/stock-filter', 'woocommerce/price-filter' ),
				'content'    => '<!-- wp:woocommerce/price-filter -->
<div class="wp-block-woocommerce-price-filter is-loading" data-showinputfields="true" data-showfilterbutton="false" data-heading="Filter by price" data-heading-level="3"><span aria-hidden="true" class="wc-block-product-categories__placeholder"></span></div>
<!-- /wp:woocommerce/price-filter -->

<!-- wp:woocommerce/stock-filter -->
<div class="wp-block-woocommerce-stock-filter is-loading" data-show-counts="true" data-heading="Filter by stock status" data-heading-level="3"><span aria-hidden="true" class="wc-block-product-stock-filter__placeholder"></span></div>
<!-- /wp:woocommerce/stock-filter -->',
			)
		);
	}
}
