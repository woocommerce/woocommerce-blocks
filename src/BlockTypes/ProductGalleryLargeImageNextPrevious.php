<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductGalleryLargeImage class.
 */
class ProductGalleryLargeImageNextPrevious extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-gallery-large-image-next-previous';

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
		return [ 'query', 'queryId', 'postId' ];
	}

	/**
	 *  Return class suffix
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	private function get_class_suffix( $attributes ) {
		switch ( $attributes['buttonPosition'] ) {
			case 'insideTheImage':
				return 'inside-image';
			case 'outsideTheImage':
				return 'outside-image';
			case 'off':
				return 'off';
			default:
				return 'off';
		}   }

	/**
	 * Include and render the block.
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string   $content    Block content. Default empty string.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		$prev_button = sprintf(
			'
			<svg class="wc-block-product-gallery-large-image-next-previous-left--%1$s" xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
			<g filter="url(#filter0_b_397_11356)">
			<rect x="0.5" width="48" height="48" rx="5" fill="black" fill-opacity="0.5"/>
			<path d="M28.1 12L30.5 14L21.3 24L30.5 34L28.1 36L17.3 24L28.1 12Z" fill="white"/>
			</g>
			<defs>
			<filter id="filter0_b_397_11356" x="-9.5" y="-10" width="68" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
			<feFlood flood-opacity="0" result="BackgroundImageFix"/>
			<feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
			<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_397_11356"/>
			<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_397_11356" result="shape"/>
			</filter>
			</defs>
			</svg>',
			$this->get_class_suffix( $attributes )
		);

		$next_button = sprintf(
			'
			<svg class="wc-block-product-gallery-large-image-next-previous-right--%1$s" xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
			<g filter="url(#filter0_b_397_11354)">
			<rect x="0.5" width="48" height="48" rx="5" fill="black" fill-opacity="0.5"/>
			<path d="M21.7001 12L19.3 14L28.5 24L19.3 34L21.7001 36L32.5 24L21.7001 12Z" fill="white"/>
			</g>
			<defs>
			<filter id="filter0_b_397_11354" x="-9.5" y="-10" width="68" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
			<feFlood flood-opacity="0" result="BackgroundImageFix"/>
			<feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
			<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_397_11354"/>
			<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_397_11354" result="shape"/>
			</filter>
			</defs>
			</svg>
		',
			$this->get_class_suffix( $attributes )
		);

		return strtr(
			'<div class="wp-block-woocommerce-product-gallery-large-image-next-previous">
			{prev_button}
			{next_button}
		</div>',
			array(
				'{prev_button}' => $prev_button,
				'{next_button}' => $next_button,
			)
		);

	}
}
