<?php
namespace Automattic\WooCommerce\Blocks\Tests\Mocks;

use Automattic\WooCommerce\Blocks\BlockTypes\Cart;

class CartMock extends Cart {

	/**
	 * For now don't need to initialize anything in tests so let's
	 * just override the default behaviour.
	 */
	protected function initialize() {
		return;
	}

	/**
	 * Protected test wrapper for deep_sort_with_accents.
	 */
	public function deep_sort_test( $array ) {
		return $this->deep_sort_with_accents( $array );
	}
}
