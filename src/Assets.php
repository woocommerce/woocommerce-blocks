<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;

/**
 * Assets class.
 * Initializes block assets.
 *
 * @since 2.5.0
 * Moved most initialization to BootStrap and AssetDataRegistry
 * classes as a part of ongoing refactor
 * @since 4.6.0
 * Blocks common data registration was moved to the AbstractBlock.
 * Assets initialization was moved to AssetsInitialization class.
 *
 * @internal
 */
class Assets {
	/**
	 * Queues a block script in the frontend.
	 *
	 * @since 2.3.0
	 * @since 2.6.0 Changed $name to $script_name and added $handle argument.
	 * @since 2.9.0 Made it so scripts are not loaded in admin pages.
	 * @deprecated 4.5.0 Block types register the scripts themselves.
	 *
	 * @param string $script_name  Name of the script used to identify the file inside build folder.
	 * @param string $handle       Optional. Provided if the handle should be different than the script name. `wc-` prefix automatically added.
	 * @param array  $dependencies Optional. An array of registered script handles this script depends on. Default empty array.
	 */
	public static function register_block_script( $script_name, $handle = '', $dependencies = [] ) {
		_deprecated_function( 'register_block_script', '4.5.0' );
		$asset_api = Package::container()->get( AssetApi::class );
		$asset_api->register_block_script( $script_name, $handle, $dependencies );
	}

}
