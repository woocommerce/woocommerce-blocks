<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductImage class.
 */
class ProductImage extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-image';

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
	protected function get_block_type_supports() {
		return array(
			'__experimentalBorder'   =>
			array(
				'radius'                          => true,
				'__experimentalSkipSerialization' => true,
			),
			'typography'             =>
			array(
				'fontSize'                        => true,
				'__experimentalSkipSerialization' => true,
			),
			'spacing'                =>
			array(
				'margin'                          => true,
				'__experimentalSkipSerialization' => true,
			),
			'__experimentalSelector' => '.wc-block-components-product-image',
		);
	}

	/**
	 * Register script and style assets for the block type before it is registered.
	 *
	 * This registers the scripts; it does not enqueue them.
	 */
	protected function register_block_type_assets() {
		parent::register_block_type_assets();
		$this->register_chunk_translations( [ $this->block_name ] );
	}


	/**
	 * Include and render the block
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string   $content    Block content. Default empty string.
	 * @param WP_Block $block Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		if ( ! empty( $content ) ) {
			return $content;
		}

		$post_id = $block->context['postId'];
		$product = wc_get_product( $post_id );
		if ( $product ) {
			$is_on_sale = $product->is_on_sale();

			return '' . wc_bool_to_string( $is_on_sale ) . '' . wp_get_attachment_image( get_post_thumbnail_id( $post_id ) );
		}
	}
}
