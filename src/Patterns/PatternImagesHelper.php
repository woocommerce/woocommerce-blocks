<?php

namespace Automattic\WooCommerce\Blocks\Patterns;

/**
 * Pattern Images Helper class.
 */
class PatternImagesHelper {
	/**
	 * Returns the pattern images.
	 *
	 * @param string $pattern_slug The pattern slug.
	 *
	 * @return array The pattern images.
	 */
	public static function get_pattern_images( string $pattern_slug ): array {
		$dictionary = get_option( PatternUpdater::WC_BLOCKS_PATTERNS_CONTENT );
		if ( empty( $dictionary ) ) {
			return array();
		}

		$pattern = null;
		foreach ( $dictionary as $item ) {
			if ( $item['slug'] === $pattern_slug ) {
				$pattern = $item;
				break;
			}
		}

		if ( empty( $pattern ) ) {
			return array();
		}

		if ( ! isset( $pattern['images'] ) ) {
			return array();
		}

		if ( ! isset( $pattern['images_total'] ) ) {
			return array();
		}

		return self::get_random_images( $pattern['images'], $pattern['images_total'] );
	}

	/**
	 * Returns the image for the given pattern.
	 *
	 * @param array  $images The array of images.
	 * @param int    $index The index of the image to return.
	 * @param string $default_image The default image to return.
	 *
	 * @return string The image.
	 */
	public static function get_image_url( array $images, int $index, string $default_image ): string {
		$image = filter_var( $default_image, FILTER_VALIDATE_URL )
			? $default_image
			: plugins_url( $default_image, dirname( __DIR__ ) );

		if ( isset( $images[ $index ] ) ) {
			$image = $images[ $index ];
		}

		return $image;
	}

	/**
	 * Returns an array of random images.
	 *
	 * @param array $images The pattern images.
	 * @param int   $images_total The total number of images needed for the pattern.
	 *
	 * @return array The random images.
	 */
	private static function get_random_images( array $images, int $images_total ): array {
		shuffle( $images );

		return array_slice( $images, 0, $images_total );
	}
}
