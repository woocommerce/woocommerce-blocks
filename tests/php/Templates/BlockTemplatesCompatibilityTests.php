<?php

namespace Automattic\WooCommerce\Blocks\Tests\Templates;

use \WP_UnitTestCase;
use Automattic\WooCommerce\Blocks\Templates\BlockTemplatesCompatibility;

/**
 * Tests the BlockTemplatesCompatibility class
 *
 */
class BlockTemplatesCompatibilityTests extends WP_UnitTestCase {

	/**
	 * Test that the default Single Product Template is wrapped in a div with the correct class.
	 */
	public function test_wrap_single_product_template_with_default_single_product_template() {

		$default_single_product_template = '
			<!-- wp:template-part {"slug":"header","theme":"twentytwentythree","tagName":"header"} /-->
			<!-- wp:group {"layout":{"inherit":true,"type":"constrained"}} -->
			<div class="wp-block-group">
  				<!-- wp:woocommerce/legacy-template {"template":"single-product"} /-->
			</div>
			<!-- /wp:group -->
			<!-- wp:template-part {"slug":"footer","theme":"twentytwentythree","tagName":"footer"} /-->';

		$expected_single_product_template = '
			<!-- wp:template-part {"slug":"header","theme":"twentytwentythree","tagName":"header"} /-->
			<!-- wp:group {"className":"woocommerce product"} -->
			<div class="wp-block-group woocommerce product">
				<!-- wp:group {"layout":{"inherit":true,"type":"constrained"}} -->
				<div class="wp-block-group">
					<!-- wp:woocommerce/legacy-template {"template":"single-product"} /-->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
			<!-- wp:template-part {"slug":"footer","theme":"twentytwentythree","tagName":"footer"} /-->';

		$result = BlockTemplatesCompatibility::wrap_single_product_template( $default_single_product_template );

		$result_without_withespace                           = preg_replace( '/\s+/', '', $result );
		$expected_single_product_template_without_whitespace = preg_replace( '/\s+/', '', $expected_single_product_template );

		$this->assertEquals( $result_without_withespace, $expected_single_product_template_without_whitespace, '' );
	}
}
