<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductGalleryPager class.
 */
class ProductGalleryPager extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-gallery-pager';

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
		return [ 'productGalleryClientId', 'pagerDisplayMode' ];
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
		$number_of_thumbnails = $block->context['thumbnailsNumberOfThumbnails'] ?? 0;
		$pager_display_mode   = $block->context['pagerDisplayMode'] ?? '';
		$classname            = $attributes['className'] ?? '';
		$wrapper_attributes   = get_block_wrapper_attributes( array( 'class' => trim( sprintf( 'woocommerce %1$s', $classname ) ) ) );
		$html                 = $this->render_pager( $pager_display_mode, $number_of_thumbnails );

		return sprintf(
			'<div %1$s>
				%2$s
			</div>',
			$wrapper_attributes,
			$html
		);
	}

	/**
	 * Renders the pager based on the given display mode.
	 *
	 * @param string $pager_display_mode The display mode for the pager. Possible values are 'dots', 'digits', and 'off'.
	 *
	 * @return string|null The rendered pager HTML, or null if the pager is disabled.
	 */
	private function render_pager( $pager_display_mode, $number_of_thumbnails ) {
		switch ( $pager_display_mode ) {
			case 'dots':
				return $this->render_dots_pager( $number_of_thumbnails );
			case 'digits':
				return $this->render_digits_pager( $number_of_thumbnails );
			case 'off':
				return null;
			default:
				return $this->render_dots_pager( $number_of_thumbnails );
		}
	}

	/**
	 * Renders the digits pager HTML.
	 *
	 * @return string The rendered digits pager HTML.
	 */
	private function render_digits_pager( $number_of_thumbnails ) {
		return sprintf(
			'<ul class="wp-block-woocommerce-product-gallery-pager__pager">
				<li class="wp-block-woocommerce-product-gallery__pager-item is-active">1</li>
				<li class="wp-block-woocommerce-product-gallery__pager-item">2</li>
				<li class="wp-block-woocommerce-product-gallery__pager-item">3</li>
				<li class="wp-block-woocommerce-product-gallery__pager-item">4</li>
			</ul>'
		);
	}

	/**
	 * Renders the dots pager HTML.
	 *
	 * @return string The rendered dots pager HTML.
	 */
	private function render_dots_pager( $number_of_thumbnails ) {
		$pager_item = sprintf(
			'<li class="wp-block-woocommerce-product-gallery__pager-item is-active">%1$s</li>',
			$this->get_dot_icon()
		);

		// <li data-wc-context="%2$s" class="wp-block-woocommerce-product-gallery__pager-item is-active">%1$s</li>
		// <li class="wp-block-woocommerce-product-gallery__pager-item">%1$s</li>
		// <li class="wp-block-woocommerce-product-gallery__pager-item">%1$s</li>
		$p = new \WP_HTML_Tag_Processor( $pager_item );

		if ( $p->next_tag() ) {
			$p->set_attribute(
				'data-wc-context',
				wp_json_encode(
					array( 'isSelected' => false )
				)
			);
			$p->set_attribute(
				'data-wc-on--click',
				'actions.productGallery.selectThumbnail'
			);
			$p->set_attribute(
				'data-page-index',
				0
			);
			$p->set_attribute(
				'data-wc-effect',
				'effects.productGallery.checkSelectedThumbnail'
			);
			$pager_item = $p->get_updated_html();
			$p->set_attribute(
				'data-page-index',
				1
			);
			$pager_item2 = $p->get_updated_html();
		}

		return sprintf(
			'<ul class="wp-block-woocommerce-product-gallery-pager__pager">
				%1$s
				%2$s
			</ul>',
			$pager_item,
			$pager_item2
			// <li data-wc-context="%2$s" class="wp-block-woocommerce-product-gallery__pager-item is-active">%1$s</li>
			// <li class="wp-block-woocommerce-product-gallery__pager-item">%1$s</li>
			// <li class="wp-block-woocommerce-product-gallery__pager-item">%1$s</li>
		);
	}

	/**
	 * Returns the dot icon SVG code.
	 *
	 * @return string The dot icon SVG code.
	 */
	private function get_dot_icon() {
		return sprintf(
			'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="6" cy="6" r="6" fill="black" fill-opacity="0.2" data-wc-bind--fill-opacity="selectors.productGallery.pager.getDotFillOpacity"  />
			</svg>'
		);
	}

	/**
	 * Returns the selected dot icon SVG code.
	 *
	 * @return string The selected dot icon SVG code.
	 */
	private function get_selected_dot_icon() {
		return sprintf(
			'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="6" cy="6" r="6" fill="black"/>
			</svg>'
		);
	}

	/**
	 * Get the Interactivity API's view script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 */
	protected function get_block_type_script( $key = null ) {
		$script = [
			'handle'       => 'wc-' . $this->block_name . '-frontend',
			'path'         => $this->asset_api->get_block_asset_build_path( $this->block_name . '-frontend' ),
			'dependencies' => [ 'wc-interactivity' ],
		];

		return $key ? $script[ $key ] : $script;
	}
}
