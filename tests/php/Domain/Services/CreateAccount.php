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
		// $mock_package = $this->getMockBuilder( Package::class );
		// return new TestedCreateAccount( $mock_package );

		// Would be good to find a way to use a mock Package, e.g. to control experimental flag.
		return new TestedCreateAccount( new Package( 'test', './' ) );
	}

	public function setUp() {
		parent::setUp();
	}

	public function tearDown() {
		parent::tearDown();
	}

	public function test_email_already_exists() {
		$user_id = $this->factory()->user->create( [
			'user_email' => 'fake@person.net',
		] );

		$this->expectException( \Exception::class );
		$this->get_test_instance()->create_customer_account( 'fake@person.net', 'Fake', 'Person' );
	}

	public function test_create_customer() {
		$user_id = $this->get_test_instance()->create_customer_account( 'fake@person.net', 'Fake', 'Person' );

		$test_user = $this->factory()->user->get_object_by_id( $user_id );

		$this->assertEquals( $test_user->first_name, 'Fake' );
		$this->assertEquals( $test_user->last_name, 'Person' );
		$this->assertEquals( $test_user->user_email, 'fake@person.net' );
		$this->assertArraySubset( $test_user->roles, [ 'customer' ] );
	}


}
