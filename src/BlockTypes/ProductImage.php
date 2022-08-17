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
	 * It is necessary to register and enqueues assets during the render phase because we want to load assets only if the block has the content.
	 */
	protected function register_block_type_assets() {
		return null;
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
			'showProductLink'         => true,
			'showSaleBadge'           => true,
			'saleBadgeAlign'          => 'right',
			'imageSizing'             => 'full-size',
			'productId'               => 'number',
			'isDescendentOfQueryLoop' => 'false',
		);

		return wp_parse_args( $attributes, $defaults );
	}

	/**
	 * Render on Sale Badge.
	 *
	 * @param \WC_Product $product Product object.
	 * @param array       $attributes Attributes.
	 * @return string
	 */
	private function render_on_sale_badge( $product, $attributes ) {
		if ( ! $product->is_on_sale() || false === $attributes['showSaleBadge'] ) {
			return '';
		}

		$on_sale_badge_align = array(
			'left'   => 'wc-block-components-product-sale-badge--align-left',
			'center' => 'wc-block-components-product-sale-badge--align-center',
			'right'  => 'wc-block-components-product-sale-badge--align-right',
		);

		$on_sale_badge = sprintf(
			'
		<div class="wc-block-components-product-sale-badge %s wc-block-grid__product-onsale">
			<span aria-hidden="true">%s</span>
			<span class="screen-reader-text">Product on sale</span>
		</div>
	',
			$on_sale_badge_align[ $attributes['saleBadgeAlign'] ],
			esc_html__( 'Sale', 'woo-gutenberg-products-block' )
		);
		return $on_sale_badge;
	}

	/**
	 * Render anchor.
	 *
	 * @param \WC_Product $product Product object.
	 * @param array       $attributes Attributes.
	 * @return string
	 */
	private function render_anchor( $product, $attributes ) {
		$product_permalink = $product->get_permalink();

		if ( false === $attributes['showProductLink'] ) {
			return sprintf( '<a href="%s" style="pointer-events: none">', $product_permalink );
		}

		return sprintf( '<a href="%s">', $product_permalink );
	}


	/**
	 * Render Image.
	 *
	 * @param \WC_Product $product Product object.
	 * @return string
	 */
	private function render_image( $product ) {
		$image_info = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'single-post-thumbnail' );

		if ( isset( $image_info[0] ) ) {
			return sprintf(
				'<img data-testid="product-image" alt="%s" src="%s">',
				$product->get_title(),
				$image_info[0]
			);
		}

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
		if ( ! empty( $content ) ) {
			parent::register_block_type_assets();
			$this->register_chunk_translations( [ $this->block_name ] );
			return $content;
		}
		$parsed_attributes = $this->parse_attributes( $attributes );
		$post_id           = $block->context['postId'];
		$product           = wc_get_product( $post_id );

		if ( $product ) {
			return sprintf(
				'
			<div class="wc-block-components-product-image wc-block-grid__product-image">
				 	%s
				 	%s
					%s
				</a>
			</div>',
				$this->render_anchor( $product, $parsed_attributes ),
				$this->render_on_sale_badge( $product, $parsed_attributes ),
				$this->render_image( $product )
			);

		}
	}
}
