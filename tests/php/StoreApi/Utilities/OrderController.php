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
		$product->set_manage_stock( true );

		wc_update_product_stock( $product, 1 );
		wc()->cart->empty_cart();
		wc()->cart->add_to_cart( $product->get_id() );
		wc_update_product_stock( $product, 0 );
		$order = OrderHelper::create_order( 1, $product ); // Note this adds 4 to the order.

		$product->set_stock_status( 'outofstock' );
		$product->save_meta_data();
		$product->save();

		var_dump( wc()->cart->get_cart_contents() );
		var_dump(wc_get_product(216)->get_stock_status());
		$this->expectException( RouteException::class );

		$class->validate_order_before_payment( $order );
	}

}
