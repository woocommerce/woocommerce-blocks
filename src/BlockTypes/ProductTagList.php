<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * ProductTagList class.
 */
class ProductTagList extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-tag-list';

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
			'color'                  =>
			array(
				'text'       => true,
				'background' => false,
				'link'       => true,
			),
			'typography'             =>
			array(
				'fontSize' => true,
			),
			'__experimentalSelector' => '.wc-block-components-product-tag-list',
		);
	}

	/**
	 * Register script and style assets for the block type before it is registered.
	 *
	 * This registers the scripts; it does not enqueue them.
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
	 * Include and render the block.
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string   $content    Block content. Default empty string.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		if ( ! empty( $content ) ) {
			parent::register_block_type_assets();
			$this->register_chunk_translations( [ $this->block_name ] );
			return $content;
		}

		$post_id                = $block->context['postId'];
		$product                = wc_get_product( $post_id );
		$product_tag_list_terms = get_the_terms( $product->get_id(), 'product_tag' );

		if ( ! $product_tag_list_terms ) {
			return '';
		}

		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );
		$classname          = isset( $attributes['className'] ) ? $attributes['className'] : '';

		$output = '<div class="wc-block-components-product-tag-list '
			. esc_attr( $classes_and_styles['classes'] ) . ' ' . esc_attr( $classname ) . '"';

		if ( isset( $classes_and_styles['styles'] ) ) {
			$output .= ' style="' . esc_attr( $classes_and_styles['styles'] ) . '"';
		}

		$output .= '>';
		$output .= __( 'Tags:', 'woo-gutenberg-products-block' );
		$output .= '<ul>';

		foreach ( $product_tag_list_terms as $product_tag_list_term ) {
			$output .= '
				<li class="tag-list-item-' . esc_attr( $product_tag_list_term->slug ) . '">
					<a href="' . esc_url( get_term_link( $product_tag_list_term->term_id ) ) . '">' . esc_html( $product_tag_list_term->name ) . '</a>
				</li>';
		}

		$output .= '</ul> </div>';

		return $output;
	}
}
