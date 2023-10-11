<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Domain\Package;
use Automattic\WooCommerce\Blocks\Utils\BlockTemplateUtils;


/**
 * BlockTypesController class.
 *
 * @internal
 */
class SingleProductTemplateController extends BlockTemplatesRefactorController {

	public function manipulate() {
		do_action( 'qm/debug', 'ci entro' );

	}

}
