<?php

if ( ! function_exists( 'get_image_url' ) ) {
	/**
	 * Returns the image for the given pattern.
	 *
	 * @param array  $images The array of images.
	 * @param int    $index The index of the image to return.
	 * @param string $default_image The default image to return.
	 *
	 * @return string The image.
	 */
	function get_image_url( array $images, int $index, string $default_image ): string {
		$image = filter_var( $default_image, FILTER_VALIDATE_URL )
			? $default_image
			: plugins_url( $default_image, dirname( __DIR__ ) );

		if ( isset( $images[ $index ] ) ) {
			$image = $images[ $index ];
		}

		return $image;
	}
}
