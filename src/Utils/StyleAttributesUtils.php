<?php
namespace Automattic\WooCommerce\Blocks\Utils;

/**
 * StyleAttributesUtils class used for getting class and style from attributes.
 */
class StyleAttributesUtils {


	/**
	 * Get class and style for font-size from attributes.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return (array | null)
	 */
	public static function get_font_size_class_and_style( $attributes ) {

		$font_size = $attributes['fontSize'];

		$custom_font_size = isset( $attributes['style']['color']['fontSize'] ) ? $attributes['style']['color']['fontSize'] : null;

		if ( ! isset( $font_size ) && ! isset( $custom_font_size ) ) {
			return null;
		};

		$has_named_font_size  = ! empty( $font_size );
		$has_custom_font_size = isset( $custom_font_size );

		if ( $has_named_font_size ) {
			return array(
				'class' => sprintf( 'has-font-size has-%s-font-size', $font_size ),
				'style' => null,
			);
		} elseif ( $has_custom_font_size ) {
			return array(
				'class' => null,
				'style' => sprintf( 'font-size: %s;', $custom_font_size ),
			);
		}
		return null;
	}

	/**
	 * Get class and style for text-color from attributes.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return (array | null)
	 */
	public static function get_text_color_class_and_style( $attributes ) {

		$text_color = $attributes['textColor'];

		$custom_text_color = isset( $attributes['style']['color']['text'] ) ? $attributes['style']['color']['text'] : null;

		if ( ! isset( $text_color ) && ! isset( $custom_text_color ) ) {
			return null;
		};

		$has_named_text_color  = ! empty( $text_color );
		$has_custom_text_color = isset( $custom_text_color );

		if ( $has_named_text_color ) {
			return array(
				'class' => sprintf( 'has-text-color has-%s-color', $text_color ),
				'style' => null,
			);
		} elseif ( $has_custom_text_color ) {
			return array(
				'class' => null,
				'style' => sprintf( 'color: %s;', $custom_text_color ),
			);
		}
		return null;

	}


	/**
	 * Get class and style for line height from attributes.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return (array | null)
	 */
	public static function get_line_height_class_and_style( $attributes ) {

		$line_height = isset( $attributes['style']['color']['lineHeight'] ) ? $attributes['style']['color']['lineHeight'] : null;

		if ( ! isset( $line_height ) ) {
			return null;
		};

		$line_height_style = sprintf( 'line-height: %s;', $line_height );

		return array(
			'class' => null,
			'style' => $line_height_style,
		);
	}

	/**
	 * Get classes and styles from attributes.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return array
	 */
	public static function get_classes_and_styles_by_attributes( $attributes ) {
		$classes_and_styles = array(
			line_height => self::get_line_height_class_and_style( $attributes ),
			text_color  => self::get_text_color_class_and_style( $attributes ),
			font_size   => self::get_font_size_class_and_style( $attributes ),
		);

		return array_filter(
			$classes_and_styles
		);

	}


}
