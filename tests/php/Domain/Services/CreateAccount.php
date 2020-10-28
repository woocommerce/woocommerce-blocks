<?php

namespace Automattic\WooCommerce\Blocks\Tests\Library;

use \WP_UnitTestCase;
use Automattic\WooCommerce\Blocks\Domain\Package;
use Automattic\WooCommerce\Blocks\Domain\Services\Email\CustomerNewAccount;

use Automattic\WooCommerce\Blocks\Domain\Services\CreateAccount as TestedCreateAccount;

/**
 * Tests CreateAccount service class.
 *
 * Note: this feature is currently feature gated. This test class assumes
 * that woocommerce_blocks_phase===3, i.e. dev build. Tests will fail
 * with other builds (release feature plugin, woo core package).
 * Related: https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/3211
 *
 * @since $VID:$
 */
class CreateAccount extends WP_UnitTestCase {

	private function get_test_instance() {
		return new TestedCreateAccount( new Package( 'test', './' ) );
	}

	/**
	 * Generalised routine for setting up test input and store state
	 * and calling from_order_request. Used for all tests.
	 *
	 * Note – this requires (assumes) that there is no logged-in user.
	 *
	 * @return assoc array with keys [ 'user_id', 'order' ] if successful.
	 */
	private function execute_create_customer_from_order( $email, $first_name, $last_name, $options = [] ) {
		/// -- Test-specific setup start.

		$tmp_enable_guest_checkout = get_option( 'woocommerce_enable_guest_checkout' );
		$enable_guest_checkout = array_key_exists( 'enable_guest_checkout', $options ) ? $options['enable_guest_checkout'] : false;
		update_option( 'woocommerce_enable_guest_checkout', $enable_guest_checkout );

		$test_request = new \WP_REST_Request();
		$should_create_account = array_key_exists( 'should_create_account', $options ) ? $options['should_create_account'] : false;
		$test_request->set_param( 'should_create_account', $should_create_account );
		$test_request->set_param( 'billing_address', [
			'email'      => $email,
			'first_name' => $first_name,
			'last_name'  => $last_name
		]);

		$test_order = new \WC_Order();

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

	public function create_customer_data() {
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
	 * Test exception is thrown if email is invalid or malformed.
	 *
	 * @dataProvider invalid_email_data
	 */
	public function test_invalid_email( $email ) {
		$this->expectException( \Exception::class );

		$result = $this->execute_create_customer_from_order(
			$email,
			'Mary',
			'Jones',
			[
				'should_create_account' => true,
				'enable_guest_checkout' => true,
			],
		);
	}

	public function invalid_email_data() {
		return [
			[ 'maryjones AT testperson DOT net' ],
			[ 'lean@fast' ],
			[ '' ],
			[ '   ' ],
		];
	}

	/**
	 * Test that a user is not created if not requested (and the site allows guest checkout).
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
