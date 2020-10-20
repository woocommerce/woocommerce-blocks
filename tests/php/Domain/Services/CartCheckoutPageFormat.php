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
	 * @dataProvider block_checkout_page_data
	 * @dataProvider shortcode_checkout_page_data
	 * @dataProvider misc_content
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

	public function custom_cart_page_data() {
		return [
			// Shortcode block AND cart block cart page.
			[
				'<!-- wp:shortcode -->
[woocommerce_cart]
<!-- /wp:shortcode --> <!-- wp:woocommerce/cart -->  		  <!-- /wp:woocommerce/cart -->',
				'woocommerce/cart',
				'woocommerce_cart',
				'custom'
			],
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

	public function shortcode_cart_page_data() {
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

	public function block_checkout_page_data() {
		return [
			// Typical/default block checkout page, extra whitespace.
			[
				'  <!-- wp:woocommerce/checkout -->
    <div class="wp-block-woocommerce-checkout is-loading">    </div>
<!-- /wp:woocommerce/checkout -->  ',
				'woocommerce/checkout',
				'woocommerce_checkout',
				'block'
			],
			// Minimal block checkout page, no inner blocks.
			[
				'<!-- wp:woocommerce/checkout --><!-- /wp:woocommerce/checkout -->',
				'woocommerce/checkout',
				'woocommerce_checkout',
				'block'
			],
		];
	}

	public function shortcode_checkout_page_data() {
		return [
			// Minimal shortcode checkout page.
			[
				'[woocommerce_checkout]',
				'woocommerce/checkout',
				'woocommerce_checkout',
				'shortcode'
			],
			// Shortcode checkout with terminator.
			[
				'[woocommerce_checkout][/woocommerce_checkout]',
				'woocommerce/checkout',
				'woocommerce_checkout',
				'shortcode'
			],
			// Shortcode block checkout page, extra whitespace.
			[
				'          <!-- wp:shortcode --> [woocommerce_checkout]  <!-- /wp:shortcode -->  ',
				'woocommerce/checkout',
				'woocommerce_checkout',
				'shortcode'
			],
			// Shortcode block checkout page, with terminator, extra whitespace.
			[
				'<!-- wp:shortcode -->  [woocommerce_checkout][/woocommerce_checkout]  <!-- /wp:shortcode -->',
				'woocommerce/checkout',
				'woocommerce_checkout',
				'shortcode'
			],
			// Shortcode block checkout page, extra whitespace.
			[
				' <!-- wp:shortcode --> [woocommerce_checkout] <!-- /wp:shortcode -->  ',
				'woocommerce/checkout',
				'woocommerce_checkout',
				'shortcode'
			],
			// Shortcode block checkout page, with terminator, extra whitespace.
			[
				'  <!-- wp:shortcode -->  [woocommerce_checkout]  [/woocommerce_checkout] <!-- /wp:shortcode -->           ',
				'woocommerce/checkout',
				'woocommerce_checkout',
				'shortcode'
			],
		];
	}

	public function misc_content() {
		$all_products_content = '<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":33.33} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:woocommerce/price-filter -->
<div class="wp-block-woocommerce-price-filter is-loading" data-showinputfields="true" data-showfilterbutton="false" data-heading="Filter by price" data-heading-level="3"><span aria-hidden="true" class="wc-block-product-categories__placeholder"></span></div>
<!-- /wp:woocommerce/price-filter -->

<!-- wp:woocommerce/attribute-filter {"attributeId":2,"heading":"Filter by Size"} -->
<div class="wp-block-woocommerce-attribute-filter is-loading" data-attribute-id="2" data-show-counts="true" data-query-type="or" data-heading="Filter by Size" data-heading-level="3"><span aria-hidden="true" class="wc-block-product-attribute-filter__placeholder"></span></div>
<!-- /wp:woocommerce/attribute-filter -->

<!-- wp:woocommerce/active-filters -->
<div class="wp-block-woocommerce-active-filters is-loading" data-display-style="list" data-heading="Active filters" data-heading-level="3"><span aria-hidden="true" class="wc-block-active-product-filters__placeholder"></span></div>
<!-- /wp:woocommerce/active-filters --></div>
<!-- /wp:column -->

<!-- wp:column {"width":66.66} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:woocommerce/all-products {"columns":3,"rows":3,"alignButtons":false,"contentVisibility":{"orderBy":true},"orderby":"date","layoutConfig":[["woocommerce/product-image",{"productLink":true,"showSaleBadge":true,"saleBadgeAlign":"right","imageSizing":"full-size","productId":0,"children":[]}],["woocommerce/product-title",{"headingLevel":2,"productLink":true,"productId":0,"color":"vivid-red","fontSize":"medium","children":[]}],["woocommerce/product-price",{"productId":0,"children":[]}],["woocommerce/product-rating",{"productId":0,"children":[]}],["woocommerce/product-button",{"productId":0,"children":[]}]]} -->
<div class="wp-block-woocommerce-all-products wc-block-all-products" data-attributes="{&quot;alignButtons&quot;:false,&quot;columns&quot;:3,&quot;contentVisibility&quot;:{&quot;orderBy&quot;:true},&quot;isPreview&quot;:false,&quot;layoutConfig&quot;:[[&quot;woocommerce/product-image&quot;,{&quot;productLink&quot;:true,&quot;showSaleBadge&quot;:true,&quot;saleBadgeAlign&quot;:&quot;right&quot;,&quot;imageSizing&quot;:&quot;full-size&quot;,&quot;productId&quot;:0,&quot;children&quot;:[]}],[&quot;woocommerce/product-title&quot;,{&quot;headingLevel&quot;:2,&quot;productLink&quot;:true,&quot;productId&quot;:0,&quot;color&quot;:&quot;vivid-red&quot;,&quot;fontSize&quot;:&quot;medium&quot;,&quot;children&quot;:[]}],[&quot;woocommerce/product-price&quot;,{&quot;productId&quot;:0,&quot;children&quot;:[]}],[&quot;woocommerce/product-rating&quot;,{&quot;productId&quot;:0,&quot;children&quot;:[]}],[&quot;woocommerce/product-button&quot;,{&quot;productId&quot;:0,&quot;children&quot;:[]}]],&quot;orderby&quot;:&quot;date&quot;,&quot;rows&quot;:3}"><!-- wp:woocommerce/product-image -->
<div class="wp-block-woocommerce-product-image is-loading"></div>
<!-- /wp:woocommerce/product-image -->

<!-- wp:woocommerce/product-title {"color":"vivid-red","fontSize":"medium"} -->
<div class="wp-block-woocommerce-product-title is-loading"></div>
<!-- /wp:woocommerce/product-title -->

<!-- wp:woocommerce/product-price -->
<div class="wp-block-woocommerce-product-price is-loading"></div>
<!-- /wp:woocommerce/product-price -->

<!-- wp:woocommerce/product-rating -->
<div class="wp-block-woocommerce-product-rating is-loading"></div>
<!-- /wp:woocommerce/product-rating -->

<!-- wp:woocommerce/product-button -->
<div class="wp-block-woocommerce-product-button is-loading"></div>
<!-- /wp:woocommerce/product-button --></div>
<!-- /wp:woocommerce/all-products --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->';

		$generic_html_content = '<div class="hero-content-left">
			<h1>Build exactly the eCommerce website you want</h1>
			<p>
				WooCommerce is a customizable, open-source eCommerce platform built on WordPress.
				Get started quickly and make your way.
			</p>
			<a href="/start/" class="button xl wc-button">Start a New Store</a>
			or
			<a href="/product-category/woocommerce-extensions/" class="hero-customize-cta">Customize &amp; Extend</a>
		</div>';

		return [
			// Classic All Products blocks layout, no cart or checkout.
			[
				$all_products_content,
				'woocommerce/cart',
				'woocommerce_cart',
				'custom'
			],
			[
				$all_products_content,
				'woocommerce/checkout',
				'woocommerce_checkout',
				'custom'
			],
			// Random html, no cart or checkout
			[
				$generic_html_content,
				'woocommerce/cart',
				'woocommerce_cart',
				'custom'
			],
			[
				$generic_html_content,
				'woocommerce/checkout',
				'woocommerce_checkout',
				'custom'
			],
		];
	}

}
