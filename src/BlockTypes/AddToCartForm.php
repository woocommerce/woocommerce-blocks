<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * CatalogSorting class.
 */
class AddToCartForm extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'add-to-cart-form';

	/**
	 * Initializes the AddToCartForm block and hooks into the `wc_add_to_cart_message_html` filter
	 * to prevent displaying the Cart Notice when the block is inside the Single Product block
	 * and the Add to Cart button is clicked.
	 *
	 * @return void
	 */
	protected function initialize() {
		parent::initialize();
		add_filter( 'wc_add_to_cart_message_html', array( $this, 'add_to_cart_message_html_filter' ), 10, 2 );
	}

	/**
	 * Get the block's attributes.
	 *
	 * @param array $attributes Block attributes. Default empty array.
	 * @return array  Block attributes merged with defaults.
	 */
	private function parse_attributes( $attributes ) {
		// These should match what's set in JS `registerBlockType`.
		$defaults = array(
			'isDescendentOfSingleProductBlock' => false,
		);

		return wp_parse_args( $attributes, $defaults );
	}

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string | void Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		global $product;

		$post_id = $block->context['postId'];

		if ( ! isset( $post_id ) ) {
			return '';
		}

		$previous_product = $product;
		$product          = wc_get_product( $post_id );
		if ( ! $product instanceof \WC_Product ) {
			$product = $previous_product;

			return '';
		}

		ob_start();

		/**
		 * Trigger the single product add to cart action for each product type.
		*
		* @since 9.7.0
		*/
		do_action( 'woocommerce_' . $product->get_type() . '_add_to_cart' );

		$product = ob_get_clean();

		if ( ! $product ) {
			$product = $previous_product;

			return '';
		}

		$parsed_attributes = $this->parse_attributes( $attributes );
		$is_descendent_of_single_product_block = $parsed_attributes['isDescendentOfSingleProductBlock'];
		$product = $this->add_is_descendent_of_single_product_block_hidden_input_to_product_form( $product, $is_descendent_of_single_product_block );

		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		$form = sprintf(
			'<div class="wp-block-add-to-cart-form product %1$s %2$s" style="%3$s">%4$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			esc_attr( $classes_and_styles['styles'] ),
			$product
		);

		$product = $previous_product;

		return $form;
	}

	/**
	 * Add a hidden input to the Add to Cart form to indicate that it is a descendent of a Single Product block.
	 *
	 * @param string $product The Add to Cart Form HTML.
	 * @param string $is_descendent_of_single_product_block Indicates if block is descendent of Single Product block.
	 *
	 * @return string The Add to Cart Form HTML with the hidden input.
	 */
	protected function add_is_descendent_of_single_product_block_hidden_input_to_product_form( $product, $is_descendent_of_single_product_block ) {

		$hidden_is_descendent_of_single_product_block_input = sprintf(
			'<input type="hidden" name="is-descendent-of-single-product-block" value="%1$s">',
			$is_descendent_of_single_product_block ? 'true' : 'false'
		);
		$regex_pattern = '/<button\s+type="submit"[^>]*>.*?<\/button>/i';

		preg_match( $regex_pattern, $product, $input_matches );

		if ( ! empty( $input_matches ) ) {
			$product = preg_replace( $regex_pattern, $hidden_is_descendent_of_single_product_block_input . $input_matches[0], $product );
		}

		return $product;
	}

	/**
	 * Filter the add to cart message to prevent the Notice from being displayed when the Add to Cart form is a descendent of a Single Product block
	 * and the Add to Cart button is clicked.
	 *
	 * @param string $message Message to be displayed when product is added to the cart.
	 */
	public function add_to_cart_message_html_filter( $message ) {
		// phpcs:ignore
		if ( isset( $_POST['is-descendent-of-single-product-block'] ) && 'true' == $_POST['is-descendent-of-single-product-block'] ) {
			return false;
		}
		return $message;
	}

	/**
	 * Get the frontend script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 */
	protected function get_block_type_script( $key = null ) {
		return null;
	}

	/**
	 * It isn't necessary register block assets because it is a server side block.
	 */
	protected function register_block_type_assets() {
		return null;
	}
}
