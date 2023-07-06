<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductGalleryNextPreviousButtons class.
 */
class ProductGalleryNextPreviousButtons extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-gallery-next-previous-buttons';

	/**
	 * It isn't necessary register block assets because it is a server side block.
	 */
	protected function register_block_type_assets() {
		return null;
	}

	/**
	 *  Register the context
	 *
	 * @return string[]
	 */
	protected function get_block_type_uses_context() {
		return null;
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
		$classname = $attributes['className'] ?? '';
		?>
	<div class="wp-block-woocommerce-product-gallery-next-previous-buttons <?php echo esc_attr( $classname ); ?>">
		<ul class="flex-direction-nav">
			<li class="flex-nav-prev">
				<a class="flex-prev" onclick="toggleFlexsliderSlide( this, 'prev' ); return false;" href="#">
					<?php echo esc_html__( 'Previous', 'woo-gutenberg-products-block' ); ?>
				</a>
			</li>
			<li class="flex-nav-next">
				<a href="#" class="flex-next" onclick="toggleFlexsliderSlide( this, 'next' ); return false;">
					<?php echo esc_html__( 'Next', 'woo-gutenberg-products-block' ); ?>
				</a>
			</li>
		</ul>
	</div>
	<script>
	function toggleFlexsliderSlide( element, direction ) {
		var galleryWrapper = element.closest( '.wp-block-woocommerce-product-gallery' );

		if ( galleryWrapper ) {
			var flexsliderInstance = jQuery( galleryWrapper ).find( '.woocommerce-product-gallery--with-images' );

				if ( direction === 'prev' ) {
					flexsliderInstance.flexslider( 'prev' );
				} else if ( direction === 'next' ) {
					flexsliderInstance.flexslider('next');
				}
		}
	}
	</script>
		<?php

		return ob_get_clean();
	}
}
