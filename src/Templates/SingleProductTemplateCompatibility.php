<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * SingleProductTemplateCompatibility class.
 *
 * To bridge the gap on compatibility with PHP hooks and Single Product templates.
 *
 * @internal
 */
class SingleProductTemplateCompatibility {

	/**
	 * For compatibility reason, we need to wrap the Single Product template in a div with specific class.
	 * For more details, see https://github.com/woocommerce/woocommerce-blocks/issues/8314.
	 *
	 * @param string $template_content Template Content.
	 * @return string Wrapped template content inside a div.
	 */
	public static function wrap_single_product_template( $template_content ) {
		$parsed_blocks  = parse_blocks( $template_content );
		$grouped_blocks = self::group_blocks( $parsed_blocks );

		// WIP: The list of blocks is WIP.
		$single_product_template_blocks = array( 'woocommerce/product-gallery-image', 'woocommerce/product-details', 'woocommerce/add-to-cart-form' );

		$wrapped_blocks = array_map(
			function( $blocks ) use ( $single_product_template_blocks ) {
				if ( 'core/template-part' === $blocks[0]['blockName'] ) {
					return $blocks;
				}

				$has_single_product_template_blocks = self::has_single_product_template_blocks( $blocks, $single_product_template_blocks );

				if ( $has_single_product_template_blocks ) {
					$wrapped_block = self::create_wrap_block_group( $blocks );
					return array( $wrapped_block[0] );
				}
				return $blocks;
			},
			$grouped_blocks
		);

		$template = array_reduce(
			$wrapped_blocks,
			function( $carry, $item ) {
				if ( is_array( $item ) ) {
					return $carry . serialize_blocks( $item );
				}
				return $carry . serialize_block( $item );
			},
			''
		);

		return $template;
	}

	/**
	 * Wrap all the blocks inside the template in a group block.
	 *
	 * @param array $blocks Array of parsed block objects.
	 * @return array Group block with the blocks inside.
	 */
	private static function create_wrap_block_group( $blocks ) {
		$serialized_blocks = serialize_blocks( $blocks );

		$new_block = parse_blocks(
			sprintf(
				'<!-- wp:group {"className":"woocommerce product"} -->
				<div class="wp-block-group woocommerce product">
					%1$s
				</div>
			<!-- /wp:group -->',
				$serialized_blocks
			)
		);

		$new_block['innerBlocks'] = $blocks;

		return $new_block;

	}

	/**
	 * Check if the Single Product template has a single product template block:
	 * woocommerce/product-gallery-image, woocommerce/product-details, woocommerce/add-to-cart-form]
	 *
	 * @param array $parsed_blocks Array of parsed block objects.
	 * @param array $single_product_template_blocks Array of single product template blocks.
	 * @return bool True if the template has a single product template block, false otherwise.
	 */
	private static function has_single_product_template_blocks( $parsed_blocks, $single_product_template_blocks ) {
		$found = false;

		foreach ( $parsed_blocks as $block ) {
			if ( isset( $block['blockName'] ) && in_array( $block['blockName'], $single_product_template_blocks, true ) ) {
				$found = true;
				break;
			}
			$found = self::has_single_product_template_blocks( $block['innerBlocks'], $single_product_template_blocks );
			if ( $found ) {
				break;
			}
		}
		return $found;
	}


	/**
	 * Group blocks in this way:
	 * B1 + TP1 + B2 + B3 + B4 + TP2 + B5
	 * (B = Block, TP = Template Part)
	 * becomes:
	 * [[B1], [TP1], [B2, B3, B4], [TP2], [B5]]
	 *
	 * @param array $parsed_blocks Array of parsed block objects.
	 * @return array Array of blocks grouped by template part.
	 */
	private static function group_blocks( $parsed_blocks ) {
		return array_reduce(
			$parsed_blocks,
			function( $carry, $block ) {
				if ( 'core/template-part' === $block['blockName'] ) {
					array_push( $carry, array( $block ) );
					return $carry;
				}
				if ( empty( $block['blockName'] ) ) {
					return $carry;
				}
				$last_element_index = count( $carry ) - 1;
				if ( isset( $carry[ $last_element_index ][0]['blockName'] ) && 'core/template-part' !== $carry[ $last_element_index ][0]['blockName'] ) {
					array_push( $carry[ $last_element_index ], $block );
					return $carry;
				}
				array_push( $carry, array( $block ) );
				return $carry;
			},
			array()
		);
	}
}
