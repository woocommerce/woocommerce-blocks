<?php
namespace Automattic\WooCommerce\Blocks\Domain\Services;

/**
 * Service class providing features allowing merchants to easily adopt blocks for cart & checkout.
 */
class CartCheckoutPageFormat {

	// TODO Consider hard-coded default inner blocks for empty cart view.
	const CART_CONTENT_BLOCK     = '<!-- wp:woocommerce/cart --><div class="wp-block-woocommerce-cart is-loading"></div><!-- /wp:woocommerce/cart -->';
	const CHECKOUT_CONTENT_BLOCK = '<!-- wp:woocommerce/checkout -->
<div class="wp-block-woocommerce-checkout is-loading"></div>
<!-- /wp:woocommerce/checkout -->';

	// TODO Finalise hard-coded cart/checkout shortcode content.
	// Should we pull these from core, can stores hook the cart shortcode content?
	// And should we wrap in a shortcode block?
	const CART_CONTENT_SHORTCODE     = '[woocommerce_cart]';
	const CHECKOUT_CONTENT_SHORTCODE = '[woocommerce_checkout]';

	/**
	 * Init.
	 */
	public function init() {
		add_action( 'admin_init', [ $this, 'admin_init' ] );

		// On options save, if the request is valid, convert format of cart
		// and/or checkout pages as requested, if needed.
		add_action(
			'woocommerce_update_options_advanced',
			function() {
				// I suspect Woo core checks this nonce before firing the hook.
				// Added our own nonce check to placate the linter.
				$nonce = isset( $_POST['_wpnonce'] ) ? sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ) : '';
				if ( ! wp_verify_nonce( $nonce, 'woocommerce-settings' ) ) {
					return;
				}

				$desired_cart_format     = isset( $_POST['cart_checkout_format_options_cart_format'] ) ? sanitize_text_field( wp_unslash( $_POST['cart_checkout_format_options_cart_format'] ) ) : '';
				$desired_checkout_format = isset( $_POST['cart_checkout_format_options_checkout_format'] ) ? sanitize_text_field( wp_unslash( $_POST['cart_checkout_format_options_checkout_format'] ) ) : '';

				$info = self::get_cart_checkout_status();

				if ( 'block' === $desired_cart_format && 'block' !== $info['cart_page_format'] ) {
					self::recreate_cart_page(
						$info['cart_page'],
						true
					);
				} elseif ( 'shortcode' === $desired_cart_format && 'shortcode' !== $info['cart_page_format'] ) {
					self::recreate_cart_page(
						$info['cart_page'],
						false
					);
				}

				if ( 'block' === $desired_checkout_format && 'block' !== $info['checkout_page_format'] ) {
					self::recreate_checkout_page(
						$info['checkout_page'],
						true
					);
				} elseif ( 'shortcode' === $desired_checkout_format && 'shortcode' !== $info['checkout_page_format'] ) {
					self::recreate_checkout_page(
						$info['checkout_page'],
						false
					);
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

	/**
	 * Recreate the cart page as a single block or shortcode.
	 *
	 * @param Object  $page         WP page object for cart page, e.g. return value of `get_post()`.
	 * @param boolean $block_format Pass true to generate a block, otherwise generates a shortcode.
	 */
	private static function recreate_cart_page( $page, $block_format ) {
		if ( $block_format ) {
			$page->post_content = self::CART_CONTENT_BLOCK;
		} else {
			$page->post_content = self::CART_CONTENT_SHORTCODE;
		}

		wp_update_post( $page );
		wp_save_post_revision( $page->ID );
	}

	/**
	 * Recreate the checkout page as a single block or shortcode.
	 *
	 * @param Object  $page         WP page object for checkout page, e.g. return value of `get_post()`.
	 * @param boolean $block_format Pass true to generate a block, otherwise generates a shortcode.
	 */
	private static function recreate_checkout_page( $page, $block_format ) {
		if ( $block_format ) {
			$page->post_content = self::CHECKOUT_CONTENT_BLOCK;
		} else {
			$page->post_content = self::CHECKOUT_CONTENT_SHORTCODE;
		}

		wp_update_post( $page );
		wp_save_post_revision( $page->ID );
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
	 * Search for a specific block type in an array of blocks (from content).
	 *
	 * @param string $block_name  The name (id) of a block, e.g. `woocommerce/cart`.
	 * @param array  $page_blocks Array of blocks returned by parse_blocks().
	 * @return boolean True if the block is present.
	 */
	private static function is_block_present( $block_name, $page_blocks ) {
		$blocks = self::filter_blocks( $block_name, $page_blocks );
		return ( $blocks && count( $blocks ) > 0 );
	}

	/**
	 * Return a regular expression for matching optional block attributes.
	 *
	 * @return string Regex.
	 */
	private static function block_attributes_regex() {
		// Primitive matcher for optional block attributes, including leading space.
		// Note we are not capturing (`?:`) to prevent breaking the shortcode
		// regex which uses numbered captured content.
		return '(?: \{.*\})?';
	}

	/**
	 * Return a regular expression for matching the start tag of a specified block.
	 *
	 * @param string $block_name The name (id) of a block, e.g. `woocommerce/cart`.
	 * @return string Regex.
	 */
	private static function block_start_regex( $block_name ) {
		return '<\!\-\- wp:' .
			preg_quote( $block_name, '/' ) .
			self::block_attributes_regex() .
			' \-\->';
	}

	/**
	 * Return a regular expression for matching the end tag of a specified block.
	 *
	 * @param string $block_name The name (id) of a block, e.g. `woocommerce/cart`.
	 * @return string Regex.
	 */
	private static function block_end_regex( $block_name ) {
		return '<\!\-\- \/wp:' .
			preg_quote( $block_name, '/' ) .
			self::block_attributes_regex() .
			' \-\->';
	}

	/**
	 * Sniff page content and determine if it's a clean cart or checkout page,
	 * and if so, whether it's using block or shortcode.
	 *
	 * If the page contains any other content, we return 'custom'.
	 *
	 * @param string $page_content Page content to inspect.
	 * @param string $block_type   Block name (id) to search for, e.g. `woocommerce/cart`.
	 * @param string $shortcode    Shortcode to search for, e.g. woocommerce_cart.
	 * @return string 'block' | 'shortcode' | 'custom'
	 */
	public static function sniff_page_format( $page_content, $block_type, $shortcode ) {
		$shortcode_block_start = self::block_start_regex( 'shortcode' );
		$shortcode_block_end   = self::block_end_regex( 'shortcode' );
		$shortcode_regex       = get_shortcode_regex( [ $shortcode ] );
		$optional_whitespace   = '\s*';

		// All regex:
		// - Use ^ and $ to match entire content (not partial),
		// by anchoring to start (^) and end ($).
		// - Use `/s` to match content across multiple lines.

		// We are concatenating regex together, so care must be taken.
		// In particular, get_shortcode_regex() returns a regex which uses
		// numbered capture groups. This means we can't use any capture
		// groups in earlier regex, or else the numbering will be offset,
		// and it won't match. See block_attributes_regex() above; uses `?:`
		// to avoid this issue.

		// The target shortcode, with optional whitespace before/after.
		$shortcode_matcher = '/^' .
			$optional_whitespace .
			$shortcode_regex .
			$optional_whitespace .
			'$/s';

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

		if ( preg_match( $shortcode_matcher, $page_content ) || preg_match( $shortcode_block_matcher, $page_content ) ) {
			return 'shortcode';
		}

		$target_block_start = self::block_start_regex( $block_type );
		$target_block_end   = self::block_end_regex( $block_type );
		$wildcard           = '.*';

		// The target block start/end tags, with any content between, and optional whitespace before/after.
		$block_matcher = '/^' .
			$optional_whitespace .
			$target_block_start .
			$wildcard .
			$target_block_end .
			$optional_whitespace .
			'$/s';

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

		$info['cart_page_format']     = self::sniff_page_format( $cart_page->post_content, 'woocommerce/cart', 'woocommerce_cart' );
		$info['checkout_page_format'] = self::sniff_page_format( $checkout_page->post_content, 'woocommerce/checkout', 'woocommerce_checkout' );

		return $info;
	}

}
