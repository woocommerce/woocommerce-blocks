<?php
namespace Automattic\WooCommerce\Blocks\Tests\Mocks;

use Automattic\WooCommerce\Blocks\BlockTypes\Cart;
use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Assets\Api;
use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\WooCommerce\Blocks\Integrations\IntegrationRegistry;

class CartMock extends Cart {

	public function __construct() {
		parent::__construct(
			Package::container()->get( API::class ),
			Package::container()->get( AssetDataRegistry::class ),
			Package::container()->get( IntegrationRegistry::class ),
		);
	}

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
