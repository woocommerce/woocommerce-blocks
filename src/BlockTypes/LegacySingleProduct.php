<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * Legacy Single Product class
 *
 * @internal
 */
class LegacySingleProduct extends AbstractDynamicBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name  = 'legacy-single-product';

	/**
	 * API version.
	 *
	 * @var string
	 */
	protected $api_version = '2';

	/**
	 * Render method for the single product template and parts.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 *
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content ) {
		ob_start();
		global $wp_query;
		$original_query = $wp_query;

		do_action( 'woocommerce_before_main_content' );

		while ( have_posts() ) :
			the_post();
			wc_get_template_part( 'content', 'single-product' );
		endwhile;

		do_action( 'woocommerce_after_main_content' );

		$wp_query = $original_query;
		wp_reset_postdata();
		return ob_get_clean();
	}
}
