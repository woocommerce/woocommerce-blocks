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

	private function execute_create_customer_from_order( $email, $first_name, $last_name, $options = [] ) {
		/// -- Test-specific setup start.

		// Can't log out the user in a unit test ("headers already sent" error).
		// So - we are assuming the tests run in an environment where the user is logged out.
		// wp_logout();

		$tmp_enable_guest_checkout = get_option( 'woocommerce_enable_guest_checkout' );
		$enable_guest_checkout = array_key_exists( 'enable_guest_checkout', $options ) ? $options['enable_guest_checkout'] : false;
		update_option( 'woocommerce_enable_guest_checkout', $enable_guest_checkout );

		$test_request = new \WP_REST_Request();
		$should_create_account = array_key_exists( 'should_create_account', $options ) ? $options['should_create_account'] : false;
		$test_request->set_param( 'should_create_account', $should_create_account );

		$test_order = new \WC_Order();
		$test_order->set_billing_email( $email );
		$test_order->set_billing_first_name( $first_name );
		$test_order->set_billing_last_name( $last_name );

		/// -- End test-specific setup.

		$user_id = $this->get_test_instance()->from_order_request( $test_order, $test_request );

		/// -- Undo test-specific setup; restore previous state.
		update_option( 'woocommerce_enable_guest_checkout', $tmp_enable_guest_checkout );

		return [
			'user_id' => $user_id,
			'order' => $test_order,
		];
	}

    /**
     * @dataProvider create_customer_data
     */
	public function test_create_customer_from_order( $email, $first_name, $last_name ) {
		$result = $this->execute_create_customer_from_order(
			$email,
			$first_name,
			$last_name,
			[
				'should_create_account' => true,
				'enable_guest_checkout' => true,
			],
		);

		$test_user = $this->factory()->user->get_object_by_id( $result['user_id'] );
		$test_order = $result['order'];

		$this->assertEquals( get_current_user_id(), $result['user_id'] );

		$this->assertEquals( $test_user->first_name, $first_name );
		$this->assertEquals( $test_user->last_name, $last_name );
		$this->assertEquals( $test_user->user_email, $email );
		$this->assertArraySubset( $test_user->roles, [ 'customer' ] );

		$this->assertEquals( $test_order->get_customer_id(), $result['user_id'] );
	}

    public function create_customer_data()
    {
        return [
        	[
        		'maryjones@testperson.net',
        		'Mary',
        		'Jones',
        		true,
        		true,
        	],
        	[
        		'henrykissinger@fbi.gov',
        		'Henry',
        		'Kissinger',
        		true,
        		true,
        	],
        ];
    }

    /**
     * @dataProvider create_customer_error_data
     */
	public function test_create_customer_from_order_error( $email, $first_name, $last_name, $exception = \Exception::class ) {
		$user_id = $this->factory()->user->create( [
			'user_email' => $email,
		] );

		$this->expectException( $exception );

		$result = $this->execute_create_customer_from_order(
			$email,
			$first_name,
			$last_name,
			[
				'should_create_account' => true,
				'enable_guest_checkout' => true,
			],
		);
	}

    public function create_customer_error_data()
    {
        return [
        	[
        		'maryjones@testperson.net',
        		'Mary',
        		'Jones',
        	],
        	[
        		'henrykissinger@fbi.gov',
        		'Henry',
        		'Kissinger',
        	],
        ];
    }
}
