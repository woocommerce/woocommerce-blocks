<?php
namespace Automattic\WooCommerce\Blocks\Domain\Services;

/**
 * Service class providing features allowing merchants to easily adopt blocks for cart & checkout.
 */
class CartCheckoutPageFormat {

	/**
	 * Init
	 */
	public function init() {
		add_action( 'admin_init', [ $this, 'admin_init' ] );
	}

	/**
	 * Add hooks for admin
	 */
	public function admin_init() {
		add_filter(
			'woocommerce_settings_pages',
			function ( $pages ) {
				$insert_after_index = array_search(
					[
						'type' => 'sectionend',
						'id'   => 'checkout_process_options',
					],
					$pages,
					true
				);
				if ( $insert_after_index ) {
					// This includes +2 fudge factor to account for SSL items
					// which don't have numeric indices.
					// This could break if Woo core $pages content changes,
					// or if other extensions filter/modify this index.
					$insert_after_index = $insert_after_index + 2;
				}
				$insert_after_index    = min( count( $pages ), $insert_after_index );
				$checkout_format_items = [
					[
						'title' => __( 'Cart and checkout format', 'woo-gutenberg-products-block' ),
						'type'  => 'title',
						'desc'  => __( 'Choose between block or shortcode formats. Learn more.', 'woo-gutenberg-products-block' ),
						'id'    => 'cart_checkout_format_options',
					],
					[
						'type' => 'sectionend',
						'id'   => 'cart_checkout_format_options',
					],
				];
				array_splice( $pages, $insert_after_index, 0, $checkout_format_items );
				return $pages;
			}
		);
	}

}
