<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use DOMDocument;
use DOMXPath;

/**
 * This help us to generate frontend UI for
 * `Add to cart` button variation from `core/button` block
 */
class ProductAddToCartButton extends AbstractBlock {

	/**
	 * API version name.
	 *
	 * @var string
	 */
	protected $api_version = '1';


	/**
	 * Initialize the block
	 */
	protected function initialize() {
		parent::initialize();

		// render_block_data hook allows us to modify the parsed block data.
		add_filter(
			'render_block_data',
			[ $this, 'render_block_data' ],
			10,
			3
		);

		// render_block hook allows us to modify the rendered HTML of a block.
		// When a block is rendered, the filter is applied, and any functions attached to it are called,
		// providing the opportunity to modify the HTML output of the block.
		add_filter(
			'render_block',
			[ $this, 'on_render_block' ],
			10,
			3
		);
	}

	/**
	 * Add __woocommerceNamespace to 'core/button' block if it's parent block
	 * 'core/buttons' is a WooCommerce variation.
	 *
	 * @param array  $parsed_block The parsed block.
	 * @param object $source_block The original block.
	 * @param object $parent_block The parent block.
	 */
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
	public function on_render_block( $block_content, $block ) {
		if ( 'core/button' !== $block['blockName'] ) {
			return $block_content;
		}

		global $post;
		$post_id = $post->ID;

		if ( $this->is_woocommerce_variation( $block ) ) {
			$product = wc_get_product( $post_id );

			if ( $product ) {
				$styles_and_classes = $this->extract_style_and_class_from_block_content( $block_content );
				$div_class          = $styles_and_classes['div_class'];
				$div_style          = $styles_and_classes['div_style'];
				$anchor_class       = $styles_and_classes['anchor_class'];
				$anchor_style       = $styles_and_classes['anchor_style'];

				return apply_filters(
					'woocommerce_loop_add_to_cart_link',
					'<div class="wp-block-button wc-block-components-product-button wc-block-grid__product-add-to-cart ' . $div_class . '" style="' . $div_style . '">
							<a
								href="' . esc_url( $product->add_to_cart_url() ) . '"
								rel="nofollow"
								data-product_id="' . esc_attr( $product->get_id() ) . '"
								data-product_sku="' . esc_attr( $product->get_sku() ) . '"
								class="wp-block-button__link ' . ( $product->is_purchasable() && ! $product->has_options() ? 'ajax_add_to_cart add_to_cart_button' : '' ) . ' product_type_' . esc_attr( $product->get_type() ) . ' ' . $anchor_class . '"
								style="' . esc_attr( $anchor_style ) . '">'
									. '<span>'
									. $this->get_anchor_inner_html( $block_content, $product )
									. '</span>'
							. '</a>'
					. '</div>',
					$product
				);
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
		if ( empty( $block_content ) ) {
			return array(
				'div_class'    => '',
				'div_style'    => '',
				'anchor_class' => '',
				'anchor_style' => '',
			);
		}

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
	 * Return inner html of anchor block. Some examples of inner html of `a` tag:
	 * - <strong><em><mark><code>Add to cart</code></mark></em></strong>
	 * - <strong>Add</strong> <strong><em>to</em></strong> <em>cart</em>
	 *
	 * @param string      $block_content The HTML content of the block.
	 * @param \WC_Product $product The product object.
	 */
	private function get_anchor_inner_html( $block_content, $product ) {
		$dom = new DOMDocument();
		$dom->loadHTML( $block_content );

		/**
		 * If the product is not a simple product, we need to remove the text
		 * that is inside the anchor element and replace it with the text
		 * that should be displayed on the "Add to Cart" button based on
		 * product type & stock status.
		 */
		if ( ! $product->is_type( 'simple' ) ) {
			$anchor_element = $dom->getElementsByTagName( 'a' )->item( 0 );
			$this->remove_text_nodes_recursively( $anchor_element );

			/**
			 * $product->add_to_cart_text() is a method that retrieves the text
			 * that should be displayed on the "Add to Cart" button for a specific product
			 *
			 * For example, if the product is a simple product and is in stock,
			 * the text will be "Add to cart". If the product is a variable product,
			 * the text will be "Select options". If the product is out of stock,
			 * the text will be "Out of stock".
			 */
			$add_to_cart_text = $product->add_to_cart_text();
			$this->add_anchor_node_text( $anchor_element, $add_to_cart_text );
		}

		$inner_html     = '';
		$anchor_element = $dom->getElementsByTagName( 'a' )->item( 0 );
		// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$children = $anchor_element->childNodes;
		foreach ( $children as $child ) {
			// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$inner_html .= $child->ownerDocument->saveXML( $child );
		}
		return $inner_html;
	}

	/**
	 * Add text to fist leaf node of anchor element
	 *
	 * @param DOMElement $anchor_element The anchor element.
	 * @param string     $text The text to add.
	 */
	private function add_anchor_node_text( $anchor_element, $text ) {
		$first_leaf_node = $this->get_first_leaf_node( $anchor_element );
		// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$first_leaf_node->nodeValue = $text;
	}

	/**
	 * Remove text nodes recursively
	 *
	 * @param DOMElement $dom The DOM element.
	 */
	private function remove_text_nodes_recursively( $dom ) {
		// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$children = $dom->childNodes;
		foreach ( $children as $child ) {
			// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			if ( XML_TEXT_NODE === $child->nodeType ) {
				// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				$child->nodeValue = '';
			} else {
				$this->remove_text_nodes_recursively( $child );
			}
		}
	}

	/**
	 * Get first leaf node
	 *
	 * @param DOMElement $node The node element.
	 */
	private function get_first_leaf_node( $node ) {
		// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		if ( 0 === $node->childNodes->length ) {
			return $node;
		}

		// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$children = $node->childNodes;
		foreach ( $children as $child ) {
			// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			if ( 0 === $child->childNodes->length ) {
				return $child;
			} else {
				return $this->get_first_leaf_node( $child );
			}
		}
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
