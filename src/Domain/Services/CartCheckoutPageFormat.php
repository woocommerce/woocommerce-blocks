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

		add_action(
			'woocommerce_update_options_advanced',
			function() {
				$desired_cart_format     = $_POST['cart_checkout_format_options_cart_format'];
				$desired_checkout_format = $_POST['cart_checkout_format_options_checkout_format'];

				$info = self::get_cart_checkout_status();

				if ( $desired_cart_format === 'shortcode' && $info['cart_page_format'] !== 'shortcode' ) {
					// Coming soon.
				} elseif ( $desired_cart_format === 'block' && $info['cart_page_format'] !== 'block' ) {
					self::set_cart_page_format_block(
						$info['cart_page']
					);
				}

				if ( $desired_checkout_format === 'shortcode' && $info['checkout_page_format'] !== 'shortcode' ) {
					// Coming soon.
				} elseif ( $desired_checkout_format === 'block' && $info['checkout_page_format'] !== 'block' ) {
					// Coming soon.
				}
			}
		);
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
					// This includes a fudge factor to account for SSL items
					// which don't have numeric indices.
					// This could break if Woo core $pages content changes,
					// or if other extensions filter/modify this index.
					// If that happened, the items would be rendered in the
					// wrong place in the settings page, so should only be a UX/
					// cosmetic issue.
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
			'block'     => __( 'Block', 'woo-gutenberg-products-block' ),
			'shortcode' => __( 'Shortcode', 'woo-gutenberg-products-block' ),
			'custom'    => __( 'Custom', 'woo-gutenberg-products-block' ),
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
		}
		$items[]     = [
			'title'   => __( 'Cart format', 'woo-gutenberg-products-block' ),
			'desc'    => $description,
			'type'    => 'select',
			'id'      => 'cart_checkout_format_options_cart_format',
			'value'   => $block_status['cart_page_format'],
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
		}
		$items[] = [
			'title'   => __( 'Checkout format', 'woo-gutenberg-products-block' ),
			'desc'    => $description,
			'type'    => 'select',
			'id'      => 'cart_checkout_format_options_checkout_format',
			'value'   => $block_status['checkout_page_format'],
			'options' => $block_shortcode_options,
		];

		$items[] = [
			'type' => 'sectionend',
			'id'   => 'cart_checkout_format_options_end',
		];

		return $items;
	}

	private static function set_cart_page_format_block( $cart_page ) {
		$shortcode_block_start = self::block_start_regex( 'wp:shortcode' );
		$shortcode_block_end   = self::block_end_regex( 'wp:shortcode' );
		$shortcode_regex       = get_shortcode_regex( [ 'woocommerce_cart' ] );
		$optional_whitespace   = '\s*';
		$shortcode_block_regex = '/' .
			$shortcode_block_start .
			$optional_whitespace .
			$shortcode_regex .
			$optional_whitespace .
			$shortcode_block_end .
			'/';

		$cart_block_content = '<!-- wp:woocommerce/cart --><div class="wp-block-woocommerce-cart is-loading"></div><!-- /wp:woocommerce/cart -->';

		$cart_page->post_content = preg_replace(
			$shortcode_block_regex,
			$cart_block_content,
			$cart_page->post_content
		);

		wp_update_post( $cart_page );
		wp_save_post_revision( $cart_page->ID );
	}

	/**
	 * Get all instances of the specified block on a specific woo page
	 * (e.g. `cart` or `checkout` page).
	 *
	 * @param string $block_name The name (id) of a block, e.g. `woocommerce/cart`.
	 * @param array  $page_blocks Array of blocks returned by parse_blocks().
	 * @return array Array of blocks as returned by parse_blocks().
	 */
	private static function filter_blocks( $block_name, $page_blocks ) {
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
	 * Search for a specified block type.
	 *
	 * @param string $block_name The name (id) of a block, e.g. `woocommerce/cart`.
	 * @param array  $page_blocks Array of blocks returned by parse_blocks().
	 * @return boolean True if the block is present.
	 */
	private static function is_block_present( $block_name, $page_blocks ) {
		$blocks = self::filter_blocks( $block_name, $page_blocks );
		return ( $blocks && count( $blocks ) > 0 );
	}


	private static function block_start_regex( $block_type ) {
		// TODO This needs to handle block attributes/props.
		return '<\!\-\- wp:' . preg_quote( $block_type, '/' ) . ' \-\->';
	}

	private static function block_end_regex( $block_type ) {
		return '<\!\-\- \/wp:' . preg_quote( $block_type, '/' ) . ' \-\->';
	}

	/**
	 * Sniff page content and determine if it's a clean cart or checkout page,
	 * and if so, whether it's using block or shortcode.
	 *
	 * If the page contains any other content, we return 'custom'.
	 *
	 * TODO this is a great candidate for unit tests.
	 *
	 * @return string 'block' | 'shortcode' | 'custom'
	 */
	private static function sniff_page_format( $page_content, $block_type, $shortcode ) {
		$shortcode_block_start = self::block_start_regex( 'shortcode' );
		$shortcode_block_end   = self::block_end_regex( 'shortcode' );
		$shortcode_regex       = get_shortcode_regex( [ $shortcode ] );
		$optional_whitespace   = '\s*';

		// The target shortcode, with optional whitespace before/after.
		$shortcode_matcher = '/^' .
			$optional_whitespace .
			$shortcode_regex .
			$optional_whitespace .
			'$/';

		// The target shortcode, in a shortcode block, with optional whitespace between elements.
		$shortcode_block_matcher = '/^' .
			$optional_whitespace .
			$shortcode_block_start .
			$optional_whitespace .
			$shortcode_regex .
			$optional_whitespace .
			$shortcode_block_end .
			$optional_whitespace .
			'$/s';

		if ( preg_match( $shortcode_matcher, $page_content) || preg_match( $shortcode_block_matcher, $page_content)  ) {
			return 'shortcode';
		}

		$target_block_start  = self::block_start_regex( $block_type );
		$target_block_end    = self::block_end_regex( $block_type );
		$wildcard            = '.*';

		// The target block start/end tags, with any content between, and optional whitespace before/after.
		$block_matcher = '/' .
			$optional_whitespace .
			$target_block_start .
			$wildcard .
			$target_block_end .
			$optional_whitespace .
			'/s';

		if ( preg_match( $block_matcher, $page_content ) ) {
			return 'block';
		}

		return 'custom';
	}

	/**
	 * Get info about what blocks & shortcodes are used on the cart & checkout pages.
	 *
	 * Note: this code is adapted from WooCommerce core: https://github.com/woocommerce/woocommerce/blob/60d6510cb049836ae5c92482f0c8853436e42726/includes/class-wc-tracker.php#L755
	 *
	 * @return array|boolean Array with page ids and whether cart or checkout
	 * blocks/shortcodes are present.
	 */
	public function get_cart_checkout_status() {
		$info = [
			'cart_page_id'                              => 0,
			'checkout_page_id'                          => 0,
			'cart_page_format'                          => 'custom',
			'checkout_page_format'                      => 'custom',
			// We're also returning these values, similar to the values in
			// wc-tracker (see doc block above). Before merging this PR,
			// evaluate if we should share code with core for these values.
			// This PR uses a more robust & flexible technique (regex + has_shortcode).
			'cart_page_contains_cart_shortcode'         => false,
			'checkout_page_contains_checkout_shortcode' => false,
			'cart_page_contains_cart_block'             => false,
			'checkout_page_contains_checkout_block'     => false,
		];

		$cart_page_id     = wc_get_page_id( 'cart' );
		$checkout_page_id = wc_get_page_id( 'checkout' );

		if ( ! $cart_page_id || ! $checkout_page_id ) {
			return $info;
		}

		$info['cart_page_id']     = $cart_page_id;
		$info['checkout_page_id'] = $checkout_page_id;

		$cart_page     = get_post( $cart_page_id );
		$checkout_page = get_post( $checkout_page_id );

		if ( ! $cart_page || ! $checkout_page ) {
			return $info;
		}

		$info['cart_page']     = $cart_page;
		$info['checkout_page'] = $checkout_page;

		$info['cart_page_contains_cart_shortcode']         = has_shortcode( $cart_page->post_content, 'woocommerce_cart' );
		$info['checkout_page_contains_checkout_shortcode'] = has_shortcode( $checkout_page->post_content, 'woocommerce_checkout' );

		$cart_page_blocks     = parse_blocks( $cart_page->post_content );
		$checkout_page_blocks = parse_blocks( $checkout_page->post_content );

		$info['cart_page_contains_cart_block']         = self::is_block_present( $cart_page_blocks, 'woocommerce/cart' );
		$info['checkout_page_contains_checkout_block'] = self::is_block_present( $checkout_page_blocks, 'woocommerce/checkout' );

		$info['cart_page_format'] = self::sniff_page_format( $cart_page->post_content, 'woocommerce/cart', 'woocommerce_cart' );
		$info['checkout_page_format'] = self::sniff_page_format( $checkout_page->post_content, 'woocommerce/checkout', 'woocommerce_checkout' );

		return $info;
	}

}
