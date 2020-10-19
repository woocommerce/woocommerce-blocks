<?php

namespace Automattic\WooCommerce\Blocks\Tests\Library;

use PHPUnit\Framework\TestCase;

use Automattic\WooCommerce\Blocks\Domain\Services\CartCheckoutPageFormat as TestedCartCheckoutPageFormat;

/**
 * Tests CartCheckoutPageFormat service class.
 *
 * @since $VID:$
 */
class CartCheckoutPageFormat extends TestCase {

	/**
	 * Test sniff_page_format().
	 *
	 * @dataProvider block_cart_page_data
	 * @dataProvider shortcode_cart_page_data
	 * @dataProvider custom_cart_page_data
	 */
	public function test_sniff_page_format( $page_content, $block_type, $shortcode, $expected_format ) {
		$result = TestedCartCheckoutPageFormat::sniff_page_format( $page_content, $block_type, $shortcode );

		$this->assertEquals( $expected_format, $result );
	}

	public function block_cart_page_data() {
		return [
			// Typical/default block cart page.
			[
				'<!-- wp:woocommerce/cart -->
<div class="wp-block-woocommerce-cart is-loading"><!-- wp:image {"align":"center","sizeSlug":"small"} -->
<div class="wp-block-image"><figure class="aligncenter size-small"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDBDOC41MDQwMyAwIDAgOC41MDQwMyAwIDE5QzAgMjkuNDk2IDguNTA0MDMgMzggMTkgMzhDMjkuNDk2IDM4IDM4IDI5LjQ5NiAzOCAxOUMzOCA4LjUwNDAzIDI5LjQ5NiAwIDE5IDBaTTI1LjEyOSAxMi44NzFDMjYuNDg1MSAxMi44NzEgMjcuNTgwNiAxMy45NjY1IDI3LjU4MDYgMTUuMzIyNkMyNy41ODA2IDE2LjY3ODYgMjYuNDg1MSAxNy43NzQyIDI1LjEyOSAxNy43NzQyQzIzLjc3MyAxNy43NzQyIDIyLjY3NzQgMTYuNjc4NiAyMi42Nzc0IDE1LjMyMjZDMjIuNjc3NCAxMy45NjY1IDIzLjc3MyAxMi44NzEgMjUuMTI5IDEyLjg3MVpNMTEuNjQ1MiAzMS4yNTgxQzkuNjE0OTIgMzEuMjU4MSA3Ljk2Nzc0IDI5LjY0OTIgNy45Njc3NCAyNy42NTczQzcuOTY3NzQgMjYuMTI1IDEwLjE1MTIgMjMuMDI5OCAxMS4xNTQ4IDIxLjY5NjhDMTEuNCAyMS4zNjczIDExLjg5MDMgMjEuMzY3MyAxMi4xMzU1IDIxLjY5NjhDMTMuMTM5MSAyMy4wMjk4IDE1LjMyMjYgMjYuMTI1IDE1LjMyMjYgMjcuNjU3M0MxNS4zMjI2IDI5LjY0OTIgMTMuNjc1NCAzMS4yNTgxIDExLjY0NTIgMzEuMjU4MVpNMTIuODcxIDE3Ljc3NDJDMTEuNTE0OSAxNy43NzQyIDEwLjQxOTQgMTYuNjc4NiAxMC40MTk0IDE1LjMyMjZDMTAuNDE5NCAxMy45NjY1IDExLjUxNDkgMTIuODcxIDEyLjg3MSAxMi44NzFDMTQuMjI3IDEyLjg3MSAxNS4zMjI2IDEzLjk2NjUgMTUuMzIyNiAxNS4zMjI2QzE1LjMyMjYgMTYuNjc4NiAxNC4yMjcgMTcuNzc0MiAxMi44NzEgMTcuNzc0MlpNMjUuOTEwNSAyOS41ODc5QzI0LjE5NDQgMjcuNTM0NyAyMS42NzM4IDI2LjM1NDggMTkgMjYuMzU0OEMxNy4zNzU4IDI2LjM1NDggMTcuMzc1OCAyMy45MDMyIDE5IDIzLjkwMzJDMjIuNDAxNiAyMy45MDMyIDI1LjYxMTcgMjUuNDA0OCAyNy43ODc1IDI4LjAyNUMyOC44NDQ4IDI5LjI4MTUgMjYuOTI5NCAzMC44MjE0IDI1LjkxMDUgMjkuNTg3OVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=" alt=""/></figure></div>
<!-- /wp:image -->

<!-- wp:heading {"align":"center","className":"wc-block-cart__empty-cart__title"} -->
<h2 class="has-text-align-center wc-block-cart__empty-cart__title">Your cart is currently empty!</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center"><a href="http://localhost:8333/?page_id=5">Browse store</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-dots"} -->
<hr class="wp-block-separator is-style-dots"/>
<!-- /wp:separator -->

<!-- wp:heading {"align":"center"} -->
<h2 class="has-text-align-center">New in store</h2>
<!-- /wp:heading -->

<!-- wp:woocommerce/product-new {"rows":1} /--></div>
<!-- /wp:woocommerce/cart -->',
				'woocommerce/cart',
				'woocommerce_cart',
				'block'
			],
			// Block cart page, no inner blocks, extra whitespace.
			[
				'  <!-- wp:woocommerce/cart -->  		  <!-- /wp:woocommerce/cart -->  ',
				'woocommerce/cart',
				'woocommerce_cart',
				'block'
			],
		];
	}

	public function shortcode_cart_page_data() {
		return [
			// Shortcode block AND cart block cart page.
// 			[
// 				'<!-- wp:shortcode -->
// [woocommerce_cart]
// <!-- /wp:shortcode --> <!-- wp:woocommerce/cart -->  		  <!-- /wp:woocommerce/cart -->',
// 				'woocommerce/cart',
// 				'woocommerce_cart',
// 				'custom'
// 			],
			// Classic shortcode cart page with a heading and paragraph.
			[
				'<h1>Buy now!</h1>
[woocommerce_cart],
<p>Click proceed to pay and get your stuff!</p>',
				'woocommerce/cart',
				'woocommerce_cart',
				'custom'
			],
			// Shortcode block page with the wrong shortcode (checkout instead of block).
			[
				'  <!-- wp:shortcode -->
   	  	 [woocommerce_checkout]
  <!-- /wp:shortcode -->				',
				'woocommerce/cart',
				'woocommerce_cart',
				'custom'
			],
			// Full shortcode format with broken terminator.
			[
				'  [woocommerce_cart]  [/woocommerce_car]   ',
				'woocommerce/cart',
				'woocommerce_cart',
				'custom'
			],
		];
	}


	public function custom_cart_page_data() {
		return [
			// Shortcode block cart page.
			[
				'<!-- wp:shortcode -->
[woocommerce_cart]
<!-- /wp:shortcode -->',
				'woocommerce/cart',
				'woocommerce_cart',
				'shortcode'
			],
			// Classic shortcode cart page.
			[
				'[woocommerce_cart]',
				'woocommerce/cart',
				'woocommerce_cart',
				'shortcode'
			],
			// Shortcode block cart page with whitespace.
			[
				'  <!-- wp:shortcode -->
   	  	 [woocommerce_cart]
  <!-- /wp:shortcode -->				',
				'woocommerce/cart',
				'woocommerce_cart',
				'shortcode'
			],
			// Full shortcode format cart page with whitespace.
			[
				'  [woocommerce_cart]  [/woocommerce_cart]   ',
				'woocommerce/cart',
				'woocommerce_cart',
				'shortcode'
			],
		];
	}

}
