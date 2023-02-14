<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * SingleProductTemplateCompatibility class.
 *
 * To bridge the gap on compatibility with PHP hooks and Single Product templates.
 *
 * @internal
 */
class SingleProductTemplateCompatibility extends AbstractTemplateCompatibility {
	const IS_FIRST_BLOCK = '__wooCommerceIsFirstBlock';
	const IS_LAST_BLOCK  = '__wooCommerceIsLastBlock';


	/**
	 * Inject hooks to rendered content of corresponding blocks.
	 *
	 * @param mixed $block_content The rendered block content.
	 * @param mixed $block         The parsed block data.
	 * @return string
	 */
	public function inject_hooks( $block_content, $block ) {
		if ( ! $this->is_single_product_template() ) {
			return $block_content;
		}

		$this->remove_default_hooks();

		if ( isset( $block['attrs'][ self::IS_FIRST_BLOCK ] ) ) {
			return sprintf(
				'%1$s%2$s%3$s',
				$this->get_hooks_buffer(
					array(
						'woocommerce_before_single_product' => $this->hook_data['woocommerce_before_single_product'],
						'woocommerce_before_single_product_summary' => $this->hook_data['woocommerce_before_single_product_summary'],
					),
					'before'
				),
				$block_content,
				$this->get_hooks_buffer(
					array(
						'woocommerce_single_product_summary' => $this->hook_data['woocommerce_single_product_summary'],
					),
					'after'
				)
			);
		}

		if ( isset( $block['attrs'][ self::IS_LAST_BLOCK ] ) ) {
			return sprintf(
				'%1$s%2$s%3$s',
				$this->get_hooks_buffer( array(), 'before' ),
				$block_content,
				$this->get_hooks_buffer(
					array(
						'woocommerce_after_single_product' => $this->hook_data['woocommerce_after_single_product'],
					),
					'after'
				)
			);
		}

		return $block_content;
	}

	/**
	 * Update the render block data to inject our custom attribute needed to
	 * determine which is the first block of the Single Product Template.
	 *
	 * @param array         $parsed_block The block being rendered.
	 * @param array         $source_block An un-modified copy of $parsed_block, as it appeared in the source content.
	 * @param WP_Block|null $parent_block If this is a nested block, a reference to the parent block.
	 *
	 * @return array
	 */
	public function update_render_block_data( $parsed_block, $source_block, $parent_block ) {
		return $parsed_block;
	}

	/**
	 * Set supported hooks.
	 */
	protected function set_hook_data() {
		$this->hook_data = array(
			'woocommerce_before_single_product'         => array(
				'block_name' => '',
				'position'   => 'before',
				'hooked'     => array(
					'woocommerce_output_all_notices' => 10,
					'woocommerce_breadcrumb'         => 20,
				),
			),
			'woocommerce_before_single_product_summary' => array(
				'block_name' => '',
				'position'   => 'before',
				'hooked'     => array(
					'woocommerce_show_product_sale_flash' => 10,
					'woocommerce_show_product_images'     => 20,
				),
			),
			'woocommerce_single_product_summary'        => array(
				'block_name' => '',
				'position'   => 'after',
				'hooked'     => array(
					'woocommerce_template_single_title'   => 5,
					'woocommerce_template_single_rating'  => 10,
					'woocommerce_template_single_price'   => 10,
					'woocommerce_template_single_excerpt' => 20,
					'woocommerce_template_single_add_to_cart' => 30,
					'woocommerce_template_single_meta'    => 40,
					'woocommerce_template_single_sharing' => 50,
				),
			),
			'woocommerce_after_single_product'          => array(
				'block_name' => '',
				'position'   => 'before',
				'hooked'     => array(),
			),
		);
	}


	/**
	 * Check if the current template is a single product template.
	 *
	 * @return bool
	 */
	private function is_single_product_template() {
		return is_product();
	}

	/**
	 * Add compatibility layer to the first and last block of the Single Product Template.
	 *
	 * @param string $template_content Template.
	 * @return string
	 */
	public static function add_compatibility_layer( $template_content ) {
		$wrapped_blocks = self::wrap_single_product_template( $template_content );
		$template       = self::inject_custom_attributes_to_first_and_last_block_single_product_template( $wrapped_blocks );

		return array_reduce(
			$template,
			function( $carry, $item ) {
				if ( is_array( $item ) ) {
					return $carry . serialize_blocks( $item );
				}
				return $carry . serialize_block( $item );
			},
			''
		);

	}


	/**
	 * For compatibility reason, we need to wrap the Single Product template in a div with specific class.
	 * For more details, see https://github.com/woocommerce/woocommerce-blocks/issues/8314.
	 *
	 * @param string $template_content Template Content.
	 * @return string Wrapped template content inside a div.
	 */
	private static function wrap_single_product_template( $template_content ) {
		$parsed_blocks  = parse_blocks( $template_content );
		$grouped_blocks = self::group_blocks( $parsed_blocks );

		// WIP: The list of blocks is WIP.
		$single_product_template_blocks = array( 'woocommerce/product-image-gallery', 'woocommerce/product-details', 'woocommerce/add-to-cart-form' );

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
		return $wrapped_blocks;
	}


	/**
	 * Add custom attributes to the first group block and last group block that wrap Single Product Template blocks.
	 * This is necessary to add the hooks woocommerce_before_single_product and woocommerce_after_single_product to the right block compatibility layer to the Single Product Template.
	 *
	 * @param array $wrapped_blocks Wrapped blocks.
	 * @return array
	 */
	private static function inject_custom_attributes_to_first_and_last_block_single_product_template( $wrapped_blocks ) {
		$template_with_custom_attributes = array_reduce(
			$wrapped_blocks,
			function( $carry, $item ) {

				$index          = $carry['index'];
				$carry['index'] = $carry['index'] + 1;
				$block          = $item[0];

				if ( 'core/template-part' === $block['blockName'] ) {
					array_push( $carry['template'], $block );
					return $carry;
				}

				if ( false === $carry['first_block']['found'] ) {
					$block['attrs'][ self::IS_FIRST_BLOCK ] = true;
					$carry['first_block']['found']          = true;
				}

				if ( true === $carry['last_block']['found'] ) {
					$index_element                         = $carry['last_block']['index'];
					$carry['last_block']['index']          = $index;
					$block['attrs'][ self::IS_LAST_BLOCK ] = true;
					unset( $carry['template'][ $index_element ]['attrs'][ self::IS_LAST_BLOCK ] );

					array_push( $carry['template'], $block );

					return $carry;
				}

				$block['attrs'][ self::IS_LAST_BLOCK ] = true;
				$carry['last_block']['found']          = true;
				$carry['last_block']['index']          = $index;

				array_push( $carry['template'], $block );

				return $carry;
			},
			array(
				'template'    => array(),
				'first_block' => array(
					'index' => '',
					'found' => false,
				),
				'last_block'  => array(
					'index' => '',
					'found' => false,
				),
				'index'       => 0,
			)
		);

		return array( $template_with_custom_attributes['template'] );
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
