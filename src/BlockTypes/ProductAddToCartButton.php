<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use DOMDocument;

/**
 * ProductAddToCartButton class.
 */
class ProductAddToCartButton extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-add-to-cart-button';

	/**
	 * API version name.
	 *
	 * @var string
	 */
	protected $api_version = '2';


	/**
	 * Adding a filter to the render_block hook
	 * that calls the on_render_block method when the filter is triggered
	 */
	protected function initialize() {
		parent::initialize();

		// render_block hook allows us to modify the rendered HTML of a block.
		// When a block is rendered, the filter is applied, and any functions attached to it are called,
		// providing the opportunity to modify the HTML output of the block.
		add_filter(
			'render_block_data',
			[ $this, 'render_block_data' ],
			10,
			3
		);
		add_filter(
			'render_block',
			[ $this, 'on_render_block' ],
			10,
			3
		);
	}

	public function render_block_data( $parsed_block, $source_block, $parent_block ) {
		if ( 'core/button' !== $source_block['blockName'] ) {
			return $parsed_block;
		}

		if ( $this->is_woocommerce_variation( $parent_block->parsed_block ) ) {
			$parsed_block['attrs']['__woocommerceNamespace'] = $parent_block->parsed_block['attrs']['__woocommerceNamespace'];
		}

		return $parsed_block;
	}

	/**
	 * Callback function that modifies the HTML content of a "core/button" block.
	 * The function checks if the block is a WooCommerce variation, fetches the product information, modifies the HTML structure of the block,
	 * and applies the filters to the block content before returning it.
	 *
	 * @param string $block_content HTML content of the block being rendered.
	 * @param array  $block         The full block, including name and attributes.
	 */
	public function on_render_block( $block_content, $block, $parent_block ) {
		// return $block_content;
		if ( 'core/button' !== $block['blockName'] ) {
			return $block_content;
		}

		global $post;
		$post_id = $post->ID;

		if ( $this->is_woocommerce_variation( $block ) ) {
			$product = wc_get_product( $post_id );

			do_action( 'qm/debug', $block );

			if ( $product ) {
				$styles_and_classes = $this->extract_style_and_class_from_block_content( $block_content );
				$div_class          = $styles_and_classes['div_class'];
				$div_style          = $styles_and_classes['div_style'];
				$anchor_class       = $styles_and_classes['anchor_class'];
				$anchor_style       = $styles_and_classes['anchor_style'];

				return '<div class="wp-block-button wc-block-components-product-button wc-block-grid__product-add-to-cart ' . $div_class . '" style="' . $div_style . '">
							<a
								href="' . esc_url( $product->add_to_cart_url() ) . '"
								rel="nofollow"
								data-product_id="' . esc_attr( $product->get_id() ) . '"
								data-product_sku="' . esc_attr( $product->get_sku() ) . '"
								class="wp-block-button__link ' . ( $product->is_purchasable() ? 'ajax_add_to_cart add_to_cart_button' : '' ) . ' wc-block-components-product-button__button product_type_' . esc_attr( $product->get_type() ) . ' ' . $anchor_class . '"
								style="' . $anchor_style . '">'
									. esc_html( $this->extract_anchor_content_from( $block_content ) )
							. '</a>'
					. '</div>';
			}
		}

		return $block_content;
	}

	/**
	 * Extracts style and class from block content
	 *
	 * @param string $block_content The HTML content of the block.
	 *
	 * @return array
	 */
	private function extract_style_and_class_from_block_content( $block_content ) {
		$dom = new DOMDocument();
		$dom->loadHTML( $block_content );

		$div       = $dom->getElementsByTagName( 'div' )->item( 0 );
		$div_class = $div->getattribute( 'class' );
		$div_style = $div->getattribute( 'style' );

		$div          = $dom->getElementsByTagName( 'a' )->item( 0 );
		$anchor_class = $div->getattribute( 'class' );
		$anchor_style = $div->getattribute( 'style' );

		return array(
			'div_class'    => $div_class,
			'div_style'    => $div_style,
			'anchor_class' => $anchor_class,
			'anchor_style' => $anchor_style,
		);
	}

	/**
	 * Extract anchor content from block content
	 */
	private function extract_anchor_content_from( $block_content ) {
		$dom = new DOMDocument();
		$dom->loadHTML( $block_content );

		$div = $dom->getElementsByTagName( 'a' )->item( 0 );
		return $div->nodeValue;
	}

	/**
	 * Check if block is a WooCommerce variation.
	 *
	 * @param array $parsed_block The block being rendered.
	 * @return boolean
	 */
	private function is_woocommerce_variation( $parsed_block ) {
		return isset( $parsed_block['attrs']['__woocommerceNamespace'] )
		&& substr( $parsed_block['attrs']['__woocommerceNamespace'], 0, 11 ) === 'woocommerce';
	}
}
