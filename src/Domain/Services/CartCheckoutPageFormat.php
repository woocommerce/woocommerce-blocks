<?php
namespace Automattic\WooCommerce\Blocks\Domain\Services;

/**
 * Service class providing features allowing merchants to easily adopt blocks for cart & checkout.
 */
class CartCheckoutPageFormat {

	/**
	 * Init.
	 */
	public function init() {
		add_action( 'admin_init', [ $this, 'admin_init' ] );
	}

	/**
	 * Register hooks for admin pages.
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
					$insert_after_index = $insert_after_index + 3;
				}
				$insert_after_index    = min( count( $pages ), $insert_after_index );
				$checkout_format_items = self::get_checkout_format_items();
				array_splice( $pages, $insert_after_index, 0, $checkout_format_items );
				return $pages;
			}
		);
	}

	/**
	 * Generate an array of elements for displaying in `WooCommerce > Settings > Advanced` admin page.
	 *
	 * @return array Array of arrays, each element with various keys (e.g. title, type, id).
	 */
	private static function get_checkout_format_items() {
		$block_status = self::get_cart_checkout_status();

		$block_shortcode_options = [
			'block'     => 'Block',
			'shortcode' => 'Shortcode',
			'error'     => 'Unknown',
		];

		$items[] = [
			'title' => __( 'Cart and checkout format', 'woo-gutenberg-products-block' ),
			'type'  => 'title',

			'desc'  => sprintf(
				// Translators: %s Documentation url.
				__( 'Choose between block or shortcode formats. <a href="%s">Learn more.</a>', 'woo-gutenberg-products-block' ),
				'https://docs.woocommerce.com/document/cart-checkout-blocks-support-status/'
			),

			__( 'Choose between block or shortcode formats. Learn more.', 'woo-gutenberg-products-block' ),
			'id'    => 'cart_checkout_format_options_title',
		];

		$description = 'Cart page is not set – select a page in the section above.';
		if ( $block_status['cart_page_id'] ) {
			$edit_url    = get_edit_post_link( $block_status['cart_page_id'] );
			$description = sprintf(
				// Translators: %s edit url for the page.
				__( '<a href="%s">Edit cart page</a>', 'woo-gutenberg-products-block' ),
				get_edit_post_link( $block_status['cart_page_id'] )
			);
			$value = 'unknown';
			if ( $block_status['cart_page_contains_cart_shortcode'] ) {
				$value = 'shortcode';
			} elseif ( $block_status['cart_page_contains_cart_block'] ) {
				$value = 'block';
			}
		}
		$items[]     = [
			'title'   => __( 'Cart format', 'woo-gutenberg-products-block' ),
			'desc'    => $description,
			'type'    => 'select',
			'id'      => 'cart_checkout_format_options_cart_format',
			'value'   => $value,
			'options' => $block_shortcode_options,
		];
		$description = 'Checkout page is not set – select a page in the section above.';
		if ( $block_status['checkout_page_id'] ) {
			$edit_url    = get_edit_post_link( $block_status['checkout_page_id'] );
			$description = sprintf(
				// Translators: %s edit url for the page.
				__( '<a href="%s">Edit checkout page</a>', 'woo-gutenberg-products-block' ),
				get_edit_post_link( $block_status['checkout_page_id'] )
			);
			$value = 'unknown';
			if ( $block_status['checkout_page_contains_checkout_shortcode'] ) {
				$value = 'shortcode';
			} elseif ( $block_status['checkout_page_contains_checkout_block'] ) {
				$value = 'block';
			}
		}
		$items[] = [
			'title'   => __( 'Checkout format', 'woo-gutenberg-products-block' ),
			'desc'    => $description,
			'type'    => 'select',
			'id'      => 'cart_checkout_format_options_checkout_format',
			'value'   => $value,
			'options' => $block_shortcode_options,
		];

		$items[] = [
			'type' => 'sectionend',
			'id'   => 'cart_checkout_format_options_end',
		];

		return $items;
	}

	/**
	 * Get blocks from a woocommerce page.
	 *
	 * @param string $woo_page_name A woocommerce page e.g. `checkout` or `cart`.
	 * @return array Array of blocks as returned by parse_blocks().
	 */
	private static function get_all_blocks_from_page( $woo_page_name ) {
		$page_id = wc_get_page_id( $woo_page_name );

		$page = get_post( $page_id );
		if ( ! $page ) {
			return array();
		}

		$blocks = parse_blocks( $page->post_content );
		if ( ! $blocks ) {
			return array();
		}

		return $blocks;
	}

	/**
	 * Get all instances of the specified block on a specific woo page
	 * (e.g. `cart` or `checkout` page).
	 *
	 * @param string $block_name The name (id) of a block, e.g. `woocommerce/cart`.
	 * @param string $woo_page_name The woo page to search, e.g. `cart`.
	 * @return array Array of blocks as returned by parse_blocks().
	 */
	private static function get_blocks_from_page( $block_name, $woo_page_name ) {
		$page_blocks = self::get_all_blocks_from_page( $woo_page_name );

		// Get any instances of the specified block.
		return array_values(
			array_filter(
				$page_blocks,
				function ( $block ) use ( $block_name ) {
					return ( $block_name === $block['blockName'] );
				}
			)
		);
	}

	/**
	 * Search for a  specific block type on a woocommerce page.
	 *
	 * @param string $block_name The name (id) of a block, e.g. `woocommerce/cart`.
	 * @param string $woo_page_name The woo page to search, e.g. `cart`.
	 * @return boolean True if page contains block.
	 */
	public static function page_contains_block( $block_name, $woo_page_name ) {
		$blocks = self::get_blocks_from_page( $block_name, $woo_page_name );

		return ( $blocks && count( $blocks ) );
	}

	/**
	 * Search a specific post for text content.
	 *
	 * @param integer $post_id The id of the post to search.
	 * @param string  $text    The text to search for.
	 * @return booleam True if post contains $text.
	 */
	public static function post_contains_text( $post_id, $text ) {
		global $wpdb;

		// Search for the text anywhere in the post.
		$wildcarded = "%{$text}%";

		$result = $wpdb->get_var(
			$wpdb->prepare(
				"
				SELECT COUNT( * ) FROM {$wpdb->prefix}posts
				WHERE ID=%d
				AND {$wpdb->prefix}posts.post_content LIKE %s
				",
				array( $post_id, $wildcarded )
			)
		);

		return ( '0' !== $result );
	}

	/**
	 * Get info about what blocks & shortcodes are used on the cart & checkout pages.
	 *
	 * Note: this code is adapted from WooCommerce core: https://github.com/woocommerce/woocommerce/blob/60d6510cb049836ae5c92482f0c8853436e42726/includes/class-wc-tracker.php#L755
	 *
	 * @return array Array with page ids and whether cart or checkout blocks/shortcodes are present.
	 */
	public function get_cart_checkout_status() {
		$cart_page_id     = wc_get_page_id( 'cart' );
		$checkout_page_id = wc_get_page_id( 'checkout' );

		return array(
			'cart_page_id'                              => $cart_page_id,
			'checkout_page_id'                          => $checkout_page_id,
			'cart_page_contains_cart_shortcode'         => self::post_contains_text(
				$cart_page_id,
				'[woocommerce_cart]'
			),
			'checkout_page_contains_checkout_shortcode' => self::post_contains_text(
				$checkout_page_id,
				'[woocommerce_checkout]'
			),
			'cart_page_contains_cart_block'             => self::page_contains_block(
				'woocommerce/cart',
				'cart'
			),
			'checkout_page_contains_checkout_block'     => self::page_contains_block(
				'woocommerce/checkout',
				'checkout'
			),
		);
	}

}
