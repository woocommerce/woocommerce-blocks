<?php
/**
 * OrderController Tests.
 */

namespace Automattic\WooCommerce\Blocks\Tests\StoreApi\Utilities;

use Automattic\WooCommerce\Blocks\StoreApi\Routes\RouteException;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\OrderController;
use PHPUnit\Framework\TestCase;
use \WC_Helper_Order as OrderHelper;
use \WC_Helper_Product as ProductHelper;

class OrderControllerTests extends TestCase {

	public function test_validate_order_before_payment() {
		$class = new OrderController();
		$product = ProductHelper::create_simple_product();
		wc()->cart->empty_cart();
		wc()->cart->add_to_cart( $product->get_id() );
		$order = $class->create_order_from_cart();
		$product->set_stock_status( 'outofstock' );
		$product->save_meta_data();
		$product->save();
		$this->expectException( RouteException::class );
		$class->validate_order_before_payment( $order );
	}

}
