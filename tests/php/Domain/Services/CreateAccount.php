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

	/**
	 * Generalised routine for setting up test input and store state
	 * and calling from_order_request. Used for all tests.
	 *
	 * @return assoc array with keys [ 'user_id', 'order' ] if successful.
	 */
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
     * Test successful user signup cases.
     *
     * @dataProvider create_customer_data
     */
	public function test_create_customer_from_order( $email, $first_name, $last_name, $options ) {
		$result = $this->execute_create_customer_from_order(
			$email,
			$first_name,
			$last_name,
			$options
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
        	// User requested an account.
        	[
        		'maryjones@testperson.net',
        		'Mary',
        		'Jones',
				[
					'should_create_account' => true,
					'enable_guest_checkout' => true,
				],
        	],
       	    // User requested an account + site doesn't allow guest.
        	[
        		'maryjones@testperson.net',
        		'Mary',
        		'Jones',
				[
					'should_create_account' => true,
					'enable_guest_checkout' => false,
				],
        	],
        	// User requested an account; name fields are not required.
        	[
        		'private_person@hotmail.com',
        		'',
        		'',
				[
					'should_create_account' => true,
					'enable_guest_checkout' => true,
				],
        	],
        	// Store does not allow guest - signup is required (automatic).
        	[
        		'henrykissinger@fbi.gov',
        		'Henry',
        		'Kissinger',
				[
					'should_create_account' => false,
					'enable_guest_checkout' => false,
				],
        	],
        ];
    }

    /**
     * Test exception is thrown if user already signed up.
     */
	public function test_customer_already_exists() {
		$user_id = $this->factory()->user->create( [
			'user_email' => 'maryjones@testperson.net',
		] );

		$this->expectException( \Exception::class );

		$result = $this->execute_create_customer_from_order(
    		'maryjones@testperson.net',
    		'Mary',
    		'Jones',
			[
				'should_create_account' => true,
				'enable_guest_checkout' => true,
			],
		);
	}

    /**
     * Test exception is thrown if email is malformed.
     */
	public function test_malformed_email() {
		$this->expectException( \Exception::class );

		$result = $this->execute_create_customer_from_order(
    		'maryjones AT testperson DOT net',
    		'Mary',
    		'Jones',
			[
				'should_create_account' => true,
				'enable_guest_checkout' => true,
			],
		);
	}

    /**
     * Test user is not created if they don't request an account (and the site allows guest checkout).
     */
	public function test_no_account_requested() {
		$site_user_counts = count_users();

		$result = $this->execute_create_customer_from_order(
    		'maryjones@testperson.net',
    		'Mary',
    		'Jones',
			[
				'should_create_account' => false,
				'enable_guest_checkout' => true,
			],
		);

		$site_user_counts_after = count_users();

		$this->assertEquals( $site_user_counts['total_users'], $site_user_counts_after['total_users'] );
	}

}
