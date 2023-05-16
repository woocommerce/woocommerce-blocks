<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * ProductImageGallery class.
 */
class ProductImageGallery extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-image-gallery';

	/**
	 * It isn't necessary register block assets because it is a server side block.
	 */
	protected function register_block_type_assets() {
		return null;
	}

	/**
	 *  Register the context
	 *
	 * @var string
	 */
	protected function get_block_type_uses_context() {
		return [ 'query', 'queryId', 'postId' ];
	}

	/**
	 * Based on the single-product/sale-flash.php template from the core of WooCommerce.
	 *
	 * @param \WC_Product $product Product instance.
	 * @param \WP_Post    $post    Post instance.
	 */
	private function sale_flash( $product, $post ) {
		if ( ! $product->is_on_sale() ) {
			return '';
		}

		ob_start();
		echo sprintf( '<span class="onsale">%1$s</span>', esc_html__( 'Sale!', 'woo-gutenberg-products-block' ) );
		return ob_get_clean();
	}

	/**
	 * Based on the single-product/product-image.php template from the core of WooCommerce.
	 *
	 * @param \WC_Product $product Product instance.
	 * @param \WP_Post    $post    Post instance.
	 *
	 * @return string
	 */
	private function product_image( $product, $post ) {
		/**
		 * The woocommerce_product_thumbnails_columns filter.
		 *
		 * Allow users to modify the number of columns displayed in the product gallery.
		 *
		 * @since TBD
		 */
		$columns           = apply_filters( 'woocommerce_product_thumbnails_columns', 4 );
		$post_thumbnail_id = $product->get_image_id();
		/**
		 * The woocommerce_single_product_image_gallery_classes filter.
		 *
		 * Allow users to modify the class names for the product image gallery.
		 *
		 * @since TBD
		 */
		$wrapper_classes = apply_filters(
			'woocommerce_single_product_image_gallery_classes',
			array(
				'woocommerce-product-gallery',
				'woocommerce-product-gallery--' . ( $post_thumbnail_id ? 'with-images' : 'without-images' ),
				'woocommerce-product-gallery--columns-' . absint( $columns ),
				'images',
			)
		);

		if ( $post_thumbnail_id ) {
			$product_image_gallery_placeholder = wc_get_gallery_image_html( $post_thumbnail_id, true );
		} else {
			$product_image_gallery_placeholder = sprintf(
				'<div class="woocommerce-product-gallery__image--placeholder"><img src="%1$s" alt="%2$s" class="wp-post-image" /></div></div>',
				esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ),
				esc_html__( 'Awaiting product image', 'woo-gutenberg-products-block' )
			);
		}
		/**
		 * The woocommerce_single_product_image_thumbnail_html filter.
		 *
		 * Allow users to modify the product gallery thumbnail html.
		 *
		 * @since TBD
		 */
		$product_image_gallery_placeholder = apply_filters( 'woocommerce_single_product_image_thumbnail_html', $product_image_gallery_placeholder, $post_thumbnail_id );

		return sprintf(
			'<div class="%1$s" data-columns="%2$s"><div class="woocommerce-product-gallery__wrapper">%3$s %4$s</div></div>',
			esc_attr( implode( ' ', array_map( 'sanitize_html_class', $wrapper_classes ) ) ),
			esc_attr( $columns ),
			$product_image_gallery_placeholder,
			$this->product_thumbnails( $product )
		);
	}

	/**
	 * Based on the single-product/product-thumbnails.php template from the core of WooCommerce.
	 *
	 * @param  \WC_Product $product Product instance.
	 *
	 * @return false|string
	 */
	private function product_thumbnails( $product ) {
		$attachment_ids = $product->get_gallery_image_ids();
		if ( ! $attachment_ids || ! $product->get_image_id() ) {
			return '';
		}

		ob_start();
		foreach ( $attachment_ids as $attachment_id ) {
			echo wp_kses_post( wc_get_gallery_image_html( $attachment_id ) );
		}
		return ob_get_clean();
	}

	/**
	 * Include and render the block.
	 *
	 * @param array     $attributes Block attributes. Default empty array.
	 * @param string    $content    Block content. Default empty string.
	 * @param \WP_Block $block      Block instance.
	 *
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];

		if ( ! isset( $post_id ) ) {
			return '';
		}

		$single_post = get_post( $post_id );
		if ( ! $single_post instanceof \WP_Post ) {
			return '';
		}

		$single_product = wc_get_product( $post_id );
		if ( ! $single_product instanceof \WC_Product ) {
			return '';
		}

		if ( class_exists( 'WC_Frontend_Scripts' ) ) {
			$frontend_scripts = new \WC_Frontend_Scripts();
			$frontend_scripts::load_scripts();
		}

		$classname = $attributes['className'] ?? '';

		return sprintf(
			'<div class="wp-block-woocommerce-product-image-gallery %1$s">%2$s %3$s</div>',
			esc_attr( $classname ),
			$this->sale_flash( $single_product, $single_post ),
			$this->product_image( $single_product, $single_post )
		);

	}
}
