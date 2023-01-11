<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * ProductImage class.
 */
class ProductGallery extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-gallery';

	/**
	 * API version name.
	 *
	 * @var string
	 */
	protected $api_version = '2';

	/**
	 * Get block supports. Shared with the frontend.
	 * IMPORTANT: If you change anything here, make sure to update the JS file too.
	 *
	 * @return array
	 */


	/**
	 * It is necessary to register and enqueues assets during the render phase because we want to load assets only if the block has the content.
	 */
	protected function register_block_type_assets() {
		return null;
	}

	/**
	 * Register the context.
	 */
	protected function get_block_type_uses_context() {
		return [ 'query', 'queryId', 'postId' ];
	}



	/**
	 * Include and render the block
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string   $content    Block content. Default empty string.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {

		$post_id = $block->context['postId'];

		do_action( 'qm/debug', $post_id );

		$product = wc_get_product( $post_id );

		$image_info = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'woocommerce_thumbnail' );

		if ( ! isset( $image_info[0] ) ) {
			// The alt text is left empty on purpose, as it's considered a decorative image.
			// More can be found here: https://www.w3.org/WAI/tutorials/images/decorative/.
			// Github discussion for a context: https://github.com/woocommerce/woocommerce-blocks/pull/7651#discussion_r1019560494.
			return sprintf( '<img src="%s" alt="" />', wc_placeholder_img_src( 'woocommerce_thumbnail' ) );
		}

			return sprintf(
				'<img data-testid="product-image" alt="%s" src="%s">',
				$product->get_title(),
				$image_info[0]
			);

	}
}
