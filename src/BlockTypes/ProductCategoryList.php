<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * ProductCategoryList class.
 */
class ProductCategoryList extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-category-list';

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
				'link'       => true,
				'background' => false,
			),
			'typography'             =>
			array(
				'fontSize'                        => true,
				'__experimentalFontStyle'         => true,
				'__experimentalFontWeight'        => true,
				'__experimentalSkipSerialization' => true,
			),
			'__experimentalSelector' => '.wc-block-components-product-category-list',
		);
	}

	/**
	 * Overwrite parent method to prevent script registration.
	 *
	 * It is necessary to register and enqueues assets during the render
	 * phase because we want to load assets only if the block has the content.
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

		$post_id                  = $block->context['postId'];
		$product                  = wc_get_product( $post_id );
		$product_categories_terms = get_the_terms( $product->get_id(), 'product_cat' );

		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );
		$classname          = isset( $attributes['className'] ) ? $attributes['className'] : '';

		$output  = '';
		$output .= '
			<div class="wc-block-components-product-category-list '
				. esc_attr( $classes_and_styles['classes'] ) . ' '
				. esc_attr( $classname ) . '" '
				. 'style="' . esc_attr( $classes_and_styles['styles'] ) . '">'
					. __( 'Categories:', 'woo-gutenberg-products-block' )
					. '<ul>';

		foreach ( $product_categories_terms as $product_category_term ) {
			$output .= '
				<li class="category-list-item-' . esc_attr( $product_category_term->slug ) . '">
					<a href="' . esc_url( get_term_link( $product_category_term->term_id ) ) . '">'
						. esc_html( $product_category_term->name )
				. '</a>'
			. '</li>';
		}

		$output .= '</ul></div>';

		return $output;
	}
}
