<?php

namespace Automattic\WooCommerce\Blocks\Tests\Domain\Package;

use \WP_UnitTestCase;
use \WC_Email;
use Automattic\WooCommerce\Blocks\Domain\Package;
use Automattic\WooCommerce\Blocks\Domain\Services\Email\CustomerNewAccount;

use Automattic\WooCommerce\Blocks\Domain\CreateAccount as TestedCreateAccount;

/**
 * Tests CreateAccount service class.
 *
 * @since $VID:$
 */
class CreateAccount extends WP_UnitTestCase {

	private function get_test_instance() {
		$mock_package = $this->getMockBuilder( Package::class );

		return new TestedCreateAccount( $mock_package );
	}

	public function test_() {

		$this->assertEquals( 1, 1 );
	}


}
