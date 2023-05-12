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
	 * Include and render the block.
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string   $content    Block content. Default empty string.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];

		if ( ! isset( $post_id ) ) {
			return '';
		}

		$single_post = get_post( $post_id );
		$single_product = wc_get_product( $post_id );
		if ( ! $single_product instanceof \WC_Product ) {
			return '';
		}

		if ( class_exists( 'WC_Frontend_Scripts' ) ) {
			$frontend_scripts = new \WC_Frontend_Scripts();
			$frontend_scripts::load_scripts();
		}

		$classname = $attributes['className'] ?? '';
		ob_start();
		if ( $single_product->is_on_sale() ) {
			echo apply_filters( 'woocommerce_sale_flash', '<span class="onsale">' . esc_html__( 'Sale!', 'woocommerce' ) . '</span>', $single_post, $single_product );
		}

		$sale_badge_html = ob_get_clean();

		ob_start();
		$columns           = apply_filters( 'woocommerce_product_thumbnails_columns', 4 );
		$post_thumbnail_id = $single_product->get_image_id();
		$wrapper_classes   = apply_filters(
			'woocommerce_single_product_image_gallery_classes',
			array(
				'woocommerce-product-gallery',
				'woocommerce-product-gallery--' . ( $post_thumbnail_id ? 'with-images' : 'without-images' ),
				'woocommerce-product-gallery--columns-' . absint( $columns ),
				'images',
			)
		);
		?>
		<div class="<?php echo esc_attr( implode( ' ', array_map( 'sanitize_html_class', $wrapper_classes ) ) ); ?>" data-columns="<?php echo esc_attr( $columns ); ?>" style="opacity: 0; transition: opacity .25s ease-in-out;">
			<div class="woocommerce-product-gallery__wrapper">
				<?php
				if ( $post_thumbnail_id ) {
					$html = wc_get_gallery_image_html( $post_thumbnail_id, true );
				} else {
					$html  = '<div class="woocommerce-product-gallery__image--placeholder">';
					$html .= sprintf( '<img src="%s" alt="%s" class="wp-post-image" />', esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ), esc_html__( 'Awaiting product image', 'woocommerce' ) );
					$html .= '</div>';
				}

				echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, $post_thumbnail_id );

				$attachment_ids = $single_product->get_gallery_image_ids();

				if ( $attachment_ids && $single_product->get_image_id() ) {
					foreach ( $attachment_ids as $attachment_id ) {
						echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', wc_get_gallery_image_html( $attachment_id ), $attachment_id );
					}
				}
				?>
			</div>
		</div>
		<?php
		$product_image_gallery_html = ob_get_clean();

		return sprintf(
			'<div class="wp-block-woocommerce-product-image-gallery %1$s">%2$s %3$s</div>',
			esc_attr( $classname ),
			$sale_badge_html,
			$product_image_gallery_html
		);

	}
}
