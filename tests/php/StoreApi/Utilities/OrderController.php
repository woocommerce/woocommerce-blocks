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

		// This product will simply be in/out of stock.
		$unmanaged_product = ProductHelper::create_simple_product();

		//This product will have exact levels of stock known.
		$managed_product = ProductHelper::create_simple_product();
		$managed_product->set_manage_stock( true );
		$managed_product->set_stock_quantity( 2 );

		wc()->cart->empty_cart();
		wc()->cart->add_to_cart( $unmanaged_product->get_id() );
		wc()->cart->add_to_cart( $managed_product->get_id(), 2 );
		$order = $class->create_order_from_cart();

		$unmanaged_product->set_stock_status( 'outofstock' );
		$unmanaged_product->save();

		$managed_product->set_stock_quantity( 1 );
		$managed_product->save();

		$this->expectException( RouteException::class );
		$class->validate_order_before_payment( $order );
	}

}
