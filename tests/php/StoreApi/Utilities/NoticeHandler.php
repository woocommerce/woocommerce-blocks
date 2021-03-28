<?php
/**
 * NoticeHandler Tests.
 */

namespace Automattic\WooCommerce\Blocks\Tests\StoreApi\Utilities;

use Automattic\WooCommerce\Blocks\StoreApi\Routes\RouteException;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\CartController;
use PHPUnit\Framework\TestCase;
use \WC_Helper_Product as ProductHelper;

class NoticeHandlerTests extends TestCase {

	public function test_api_does_not_return_html() {
		// We expect validate_cart_items to throw
		$this->expectException(RouteException::class);
		$this->expectExceptionMessage('This is an error message with Some HTML in it.');
		$class = new CartController();
		add_action( 'woocommerce_check_cart_items', function() {
			wc_add_notice( '<strong>This is an error message with <a href="#">Some HTML in it</a>.', 'error' );
		} );
		$product = ProductHelper::create_simple_product();
		wc()->cart->add_to_cart( $product->get_id(), 2 );
		$class->validate_cart_items();
	}
}
