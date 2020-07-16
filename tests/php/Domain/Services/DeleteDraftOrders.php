<?php

namespace Automattic\WooCommerce\Blocks\Tests\Library;

use PHPUnit\Framework\TestCase;
use \WC_Order;
use Automattic\WooCommerce\Blocks\Domain\Services\DraftOrders;
use Automattic\WooCommerce\Blocks\Domain\Package;

/**
 * Tests Delete Draft Orders functionality
 *
 * @since $VID:$
 * @group testing
 */
class DeleteDraftOrders extends TestCase {

	private $draft_orders_instance;

	/**
	 * During setup create some draft orders.
	 *
	 * @return void
	 */
	public function setUp() {
		global $wpdb;

		$this->draft_orders_instance = new DraftOrders( new Package( 'test', './') );

		$order = new WC_Order();
		$order->set_status( DraftOrders::STATUS );
		$order->save();

		$order = new WC_Order();
		$order->set_status( DraftOrders::STATUS );
		$order->save();
		$wpdb->update(
			$wpdb->posts,
			array(
				'post_modified'     => date( 'Y-m-d H:i:s', strtotime( '-1 DAY', current_time( 'timestamp' ) ) ),
				'post_modified_gmt' => gmdate( 'Y-m-d H:i:s', strtotime( '-1 DAY' ) )
			),
			array(
				'ID' => $order->get_id()
			)
		);

		$order = new WC_Order();
		$order->set_status( DraftOrders::STATUS );
		$order->save();
		$wpdb->update(
			$wpdb->posts,
			array(
				'post_modified'     => date( 'Y-m-d H:i:s', strtotime( '-2 DAY', current_time( 'timestamp' ) ) ),
				'post_modified_gmt' => gmdate( 'Y-m-d H:i:s', strtotime( '-2 DAY' ) )
			),
			array(
				'ID' => $order->get_id()
			)
		);

		// set a non-draft order to make sure it's unaffected
		$order = new WC_Order();
		$order->set_status( 'wc-on-hold' );
		$order->save();
		$wpdb->update(
			$wpdb->posts,
			array(
				'post_modified'     => date( 'Y-m-d H:i:s', strtotime( '-2 DAY', current_time( 'timestamp' ) ) ),
				'post_modified_gmt' => gmdate( 'Y-m-d H:i:s', strtotime( '-2 DAY' ) )
			),
			array(
				'ID' => $order->get_id()
			)
		);
	}

	public function tearDown() {
		$this->draft_orders_instance = null;
	}

	/**
	 * Delete draft orders older than a day.
	 *
	 * Ran on a daily cron schedule.
	 */
	public function test_delete_expired_draft_orders() {
		global $wpdb;
		$status = DraftOrders::DB_STATUS;

		// Check there are 3 draft orders from our setup before running tests.
		$this->assertEquals( 3, (int) $wpdb->get_var( "SELECT COUNT(ID) from $wpdb->posts posts WHERE posts.post_status = '$status'" ) );

		// Run delete query.
		$this->draft_orders_instance->delete_expired_draft_orders();

		// Only 1 should remain.
		$this->assertEquals( 1, (int) $wpdb->get_var( "SELECT COUNT(ID) from $wpdb->posts posts WHERE posts.post_status = '$status'" ) );

		// The non-draft order should still be present
		$this->assertEquals( 1, (int) $wpdb->get_var( "SELECT COUNT(ID) from $wpdb->posts posts WHERE posts.post_status = 'wc-on-hold'" ) );
	}
}
