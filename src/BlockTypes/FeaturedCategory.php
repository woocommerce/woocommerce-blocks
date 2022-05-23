<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * FeaturedCategory class.
 */
class FeaturedCategory extends AbstractDynamicBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'featured-category';

	/**
	 * Default attribute values, should match what's set in JS `registerBlockType`.
	 *
	 * @var array
	 */
	protected $defaults = array(
		'align' => 'none',
	);

	/**
	 * Global style enabled for this block.
	 *
	 * @var array
	 */
	protected $global_style_wrapper = array(
		'text_color',
		'font_size',
		'border_color',
		'border_radius',
		'border_width',
		'background_color',
		'text_color',
		'padding',
	);

	/**
	 * Get the supports array for this block type.
	 *
	 * @see $this->register_block_type()
	 * @return string;
	 */
	protected function get_block_type_supports() {
		return array(
			'color' => array(
				'__experimentalDuotone' => '.wc-block-featured-category__background-image',
			),
		);
	}

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_block_type_attributes() {
		return array_merge(
			parent::get_block_type_attributes(),
			array(
				'textColor'  => $this->get_schema_string(),
				'fontSize'   => $this->get_schema_string(),
				'lineHeight' => $this->get_schema_string(),
				'style'      => array( 'type' => 'object' ),
			)
		);
	}

	/**
	 * Render the Featured Category block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content ) {
		$id = absint( $attributes['categoryId'] ?? 0 );

		$category = get_term( $id, 'product_cat' );
		if ( ! $category || is_wp_error( $category ) ) {
			return '';
		}

		$attributes = wp_parse_args( $attributes, $this->defaults );

		$attributes['height'] = $attributes['height'] ?? wc_get_theme_support( 'featured_block::default_height', 500 );

		$title = sprintf(
			'<h2 class="wc-block-featured-category__title">%s</h2>',
			wp_kses_post( $category->name )
		);

		$desc_str = sprintf(
			'<div class="wc-block-featured-category__description">%s</div>',
			wc_format_content( wp_kses_post( $category->description ) )
		);

		$image_url = esc_url( $this->get_image_url( $attributes, $category ) );

		$styles  = $this->get_styles( $attributes );
		$classes = $this->get_classes( $attributes );

		$output  = sprintf( '<div class="%1$s wp-block-woocommerce-featured-category" style="%2$s">', esc_attr( trim( $classes ) ), esc_attr( $styles ) );
		$output .= '<div class="wc-block-featured-category__wrapper">';
		$output .= $this->render_overlay( $attributes );

		if ( ! $attributes['isRepeated'] && ! $attributes['hasParallax'] ) {
			$output .= $this->render_image( $attributes, $category, $image_url );
		} else {
			$output .= $this->render_bg_image( $attributes, $image_url );
		}

		$output .= $title;
		if ( $attributes['showDesc'] ) {
			$output .= $desc_str;
		}
		$output .= '<div class="wc-block-featured-category__link">' . $content . '</div>';
		$output .= '</div>';
		$output .= '</div>';
		return $output;
	}

	/**
	 * Returns the url of a category image
	 * Renders the featured image as a div background.
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string $image_url Product image url.
	 *
	 * @return string
	 */
	private function render_bg_image( $attributes, $image_url ) {
		$styles = $this->get_bg_styles( $attributes, $image_url );

		$classes = [ 'wc-block-featured-category__background-image' ];

		if ( $attributes['hasParallax'] ) {
			$classes[] = ' has-parallax';
		}

		return sprintf( '<div class="%1$s" style="%2$s" /></div>', implode( ' ', $classes ), $styles );
	}

	/**
	 * Get the styles for the wrapper element (background image, color).
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $image_url Product image url.
	 *
	 * @return string
	 */
	private function get_image_url( $attributes, $category ) {
	public function get_bg_styles( $attributes, $image_url ) {
		$style = '';

		if ( $attributes['isRepeated'] || $attributes['hasParallax'] ) {
			$style .= "background-image: url($image_url);";
		}

		if ( ! $attributes['isRepeated'] ) {
			$style .= 'background-repeat: no-repeat;';
			$style .= 'background-size: ' . ( 'cover' === $attributes['imageFit'] ? $attributes['imageFit'] : 'auto' ) . ';';
		}

		if ( $this->hasFocalPoint( $attributes ) ) {
			$style .= sprintf(
				'background-position: %s%% %s%%;',
				$attributes['focalPoint']['x'] * 100,
				$attributes['focalPoint']['y'] * 100
			);
		}

		$global_style_style = StyleAttributesUtils::get_styles_by_attributes( $attributes, $this->global_style_wrapper );
		$style             .= $global_style_style;

		return $style;
	}

	/**
	 * Returns the url of a category image
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param \WP_Term $category Category object.
	 *
	 * @return string
	 */
	private function get_image_url( $attributes, $category ) {
		$image_size = 'large';
		if ( 'none' !== $attributes['align'] || $attributes['height'] > 800 ) {
			$image_size = 'full';
		}

		if ( $attributes['mediaId'] ) {
			return wp_get_attachment_image_url( $attributes['mediaId'], $image_size );
		}

		return $this->get_image( $category, $image_size );
	}

	/**
	 * Renders the featured image
	 *
	 * @param array       $attributes Block attributes. Default empty array.
	 * @param \WC_Product $category   Product object.
	 * @param string      $image_url Product image url.
	 *
	 * @return string
	 */
	private function render_image( $attributes, $category, string $image_url ) {
		$style = sprintf( 'object-fit: %s;', $attributes['imageFit'] );

		if ( $this->hasFocalPoint( $attributes ) ) {
			$style .= sprintf(
				'object-position: %s%% %s%%;',
				$attributes['focalPoint']['x'] * 100,
				$attributes['focalPoint']['y'] * 100
			);
		}

		if ( ! empty( $image_url ) ) {
			return sprintf(
				'<img alt="%1$s" class="wc-block-featured-category__background-image" src="%2$s" style="%3$s" />',
				wp_kses_post( $attributes['alt'] ?: $category->name ),
				$image_url,
				$style
			);
		}

		return '';
	}

	/**
	 * Returns whether the focal point is defined for the block.
	 *
	 * @param array $attributes Block attributes. Default empty array.
	 *
	 * @return bool
	 */
	private function hasFocalPoint( $attributes ): bool {
		return is_array( $attributes['focalPoint'] ) && 2 === count( $attributes['focalPoint'] );
	}

	/**
	 * Renders the featured image as a div background.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $image_url Product image url.
	 *
	 * @return string
	 */
	private function render_bg_image( $attributes, $image_url ) {
		$styles = $this->get_bg_styles( $attributes, $image_url );

		$classes = [ 'wc-block-featured-category__background-image' ];

		if ( $attributes['hasParallax'] ) {
			$classes[] = ' has-parallax';
		}

		return sprintf( '<div class="%1$s" style="%2$s" /></div>', implode( ' ', $classes ), $styles );
	}

	/**
	 * Get the styles for the wrapper element (background image, color).
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $image_url Product image url.
	 *
	 * @return string
	 */
	public function get_bg_styles( $attributes, $image_url ) {
		$style = '';

		if ( $attributes['isRepeated'] || $attributes['hasParallax'] ) {
			$style .= "background-image: url($image_url);";
		}

		if ( ! $attributes['isRepeated'] ) {
			$style .= 'background-repeat: no-repeat;';
			$style .= 'background-size: ' . ( 'cover' === $attributes['imageFit'] ? $attributes['imageFit'] : 'auto' ) . ';';
		}

		if ( $this->hasFocalPoint( $attributes ) ) {
			$style .= sprintf(
				'background-position: %s%% %s%%;',
				$attributes['focalPoint']['x'] * 100,
				$attributes['focalPoint']['y'] * 100
			);
		}

		$global_style_style = StyleAttributesUtils::get_styles_by_attributes( $attributes, $this->global_style_wrapper );
		$style             .= $global_style_style;

		return $style;
	}

	/**
	 * Get the styles for the wrapper element (background image, color).
	 *
	 * @param array $attributes Block attributes. Default empty array.
	 * @return string
	 */
	public function get_styles( $attributes ) {
		$style = '';

		$min_height = $attributes['minHeight'] ?? wc_get_theme_support( 'featured_block::default_height', 500 );

		if ( isset( $attributes['minHeight'] ) ) {
			$style .= sprintf( 'min-height:%dpx;', intval( $min_height ) );
		}

		$global_style_style = StyleAttributesUtils::get_styles_by_attributes( $attributes, $this->global_style_wrapper );
		$style             .= $global_style_style;

		return $style;
	}

	/**
	 * Renders the block overlay
	 *
	 * @param array $attributes Block attributes. Default empty array.
	 *
	 * @return string
	 */
	private function render_overlay( $attributes ) {
		if ( isset( $attributes['overlayGradient'] ) ) {
			$overlay_styles = sprintf( 'background-image: %s', $attributes['overlayGradient'] );
		} elseif ( isset( $attributes['overlayColor'] ) ) {
			$overlay_styles = sprintf( 'background-color: %s', $attributes['overlayColor'] );
		} else {
			$overlay_styles = 'background-color: #000000';
		}

		return sprintf( '<div class="background-dim__overlay" style="%s"></div>', esc_attr( $overlay_styles ) );
	}

	/**
	 * Get class names for the block container.
	 *
	 * @param array $attributes Block attributes. Default empty array.
	 * @return string
	 */
	public function get_classes( $attributes ) {
		$classes = array( 'wc-block-' . $this->block_name );

		if ( isset( $attributes['align'] ) ) {
			$classes[] = "align{$attributes['align']}";
		}

		if ( isset( $attributes['dimRatio'] ) && ( 0 !== $attributes['dimRatio'] ) ) {
			$classes[] = 'has-background-dim';

			if ( 50 !== $attributes['dimRatio'] ) {
				$classes[] = 'has-background-dim-' . 10 * round( $attributes['dimRatio'] / 10 );
			}
		}

		if ( isset( $attributes['contentAlign'] ) && 'center' !== $attributes['contentAlign'] ) {
			$classes[] = "has-{$attributes['contentAlign']}-content";
		}

		if ( isset( $attributes['className'] ) ) {
			$classes[] = $attributes['className'];
		}

		$global_style_classes = StyleAttributesUtils::get_classes_by_attributes( $attributes, $this->global_style_wrapper );

		$classes[] = $global_style_classes;

		return implode( ' ', $classes );
	}

	/**
	 * Returns the main product image URL.
	 *
	 * @param \WP_Term $category Term object.
	 * @param string   $size    Image size, defaults to 'full'.
	 * @return string
	 */
	public function get_image( $category, $size = 'full' ) {
		$image    = '';
		$image_id = get_term_meta( $category->term_id, 'thumbnail_id', true );

		if ( $image_id ) {
			$image = wp_get_attachment_image_url( $image_id, $size );
		}

		return $image;
	}

	/**
	 * Returns whether the focal point is defined for the block.
	 *
	 * @param array $attributes Block attributes. Default empty array.
	 *
	 * @return bool
	 */
	private function hasFocalPoint( $attributes ): bool {
		return is_array( $attributes['focalPoint'] ) && 2 === count( $attributes['focalPoint'] );
	}

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_data( array $attributes = [] ) {
		parent::enqueue_data( $attributes );
		$this->asset_data_registry->add( 'min_height', wc_get_theme_support( 'featured_block::min_height', 500 ), true );
		$this->asset_data_registry->add( 'default_height', wc_get_theme_support( 'featured_block::default_height', 500 ), true );
	}
}
