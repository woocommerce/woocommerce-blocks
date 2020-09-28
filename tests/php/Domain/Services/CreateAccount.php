<?php

namespace Automattic\WooCommerce\Blocks\Tests\Library;

use \WP_UnitTestCase;
use Automattic\WooCommerce\Blocks\Domain\Package;
use Automattic\WooCommerce\Blocks\Domain\Services\Email\CustomerNewAccount;

use Automattic\WooCommerce\Blocks\Domain\Services\CreateAccount as TestedCreateAccount;

/**
 * Tests CreateAccount service class.
 *
 * @since $VID:$
 */
class CreateAccount extends WP_UnitTestCase {

	private function get_test_instance() {
		// Would be good to find a way to use a mock Package, e.g. to control experimental flag.
		return new TestedCreateAccount( new Package( 'test', './' ) );
	}

	public function test_email_already_exists() {
		$user_id = $this->factory()->user->create( [
			'user_email' => 'fake@person.net',
		] );

		$this->expectException( \Exception::class );
		$this->get_test_instance()->create_customer_account( 'fake@person.net', 'Fake', 'Person' );
	}

	public function test_create_customer_from_order() {
		/// -- Test-specific setup start.

		// Can't log out the user in a unit test ("headers already sent" error).
		// So - we are assuming the tests run in an environment where the user is logged out.
		// wp_logout();

		$enable_guest_checkout = get_option( 'woocommerce_enable_guest_checkout' );
		update_option( 'woocommerce_enable_guest_checkout', true );

		$test_request = new \WP_REST_Request();
		$test_request->set_param( 'should_create_account', true );

		$test_order = new \WC_Order();
		$test_order->set_billing_email( 'fake@person.net' );
		$test_order->set_billing_first_name( 'Fake' );
		$test_order->set_billing_last_name( 'Person' );

		/// -- End test-specific setup.

		$user_id = $this->get_test_instance()->from_order_request( $test_order, $test_request );

		$test_user = $this->factory()->user->get_object_by_id( $user_id );

		$this->assertEquals( get_current_user_id(), $user_id );

		$this->assertEquals( $test_user->first_name, 'Fake' );
		$this->assertEquals( $test_user->last_name, 'Person' );
		$this->assertEquals( $test_user->user_email, 'fake@person.net' );
		$this->assertArraySubset( $test_user->roles, [ 'customer' ] );

		$this->assertEquals( $test_order->get_customer_id(), $user_id );

		/// -- Undo test-specific setup; leave things how they were.
		update_option( 'woocommerce_enable_guest_checkout', $enable_guest_checkout );
	}

}
