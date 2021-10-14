<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

class LegacySingleProduct extends AbstractDynamicBlock {
	protected $block_name  = 'legacy-single-product';
	protected $api_version = '2';

	protected function render( $attributed, $content ) {
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
