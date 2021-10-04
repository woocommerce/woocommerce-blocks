<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

class LegacySingleProduct extends AbstractDynamicBlock {
	protected $block_name  = 'legacy-single-product';
	protected $api_version = '2';

	protected function render( $attributed, $content ) {
		ob_start();
		global $wp_query;
		$original_query = $wp_query;
		// using this to detect if in editor context
		if ( ! is_singular( 'product' ) ) {
			// hacky need to include frontend template hooks when in editor.
			require_once WC_ABSPATH . 'includes/wc-template-functions.php';
			require_once WC_ABSPATH . 'includes/wc-template-hooks.php';
			// hacky need to remove notices because there's more dependencies in the notices output - probably could just do this in the editor context.
			remove_action( 'woocommerce_before_single_product', 'woocommerce_output_all_notices', 10 );
			// fudge a single product for previewing template.
			$wp_query = new \WP_Query(
				[
					'posts_per_page'      => 1,
					'post_type'           => 'product',
					'post_status'         => 'publish',
					'ignore_sticky_posts' => 1,
					'no_found_rows'       => 1,

				]
			);
		}
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
