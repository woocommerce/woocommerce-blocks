<?php

namespace Automattic\WooCommerce\Blocks\Patterns;

use Automattic\WooCommerce\Blocks\AI\Connection;
use WP_Error;

/**
 * Pattern Images class.
 */
class PatternUpdater {

	/**
	 * The patterns content option name.
	 */
	const WC_BLOCKS_PATTERNS_CONTENT = 'wc_blocks_patterns_content';

	/**
	 * Creates the patterns content for the given vertical.
	 *
	 * @param Connection      $ai_connection The AI connection.
	 * @param string|WP_Error $token The JWT token.
	 * @param array|WP_Error  $images The array of images.
	 * @param string          $business_description The business description.
	 *
	 * @return bool|WP_Error
	 */
	public function generate_content( $ai_connection, $token, $images, $business_description ) {
		if ( is_wp_error( $images ) ) {
			return $images;
		}

		$patterns_with_images = $this->get_patterns_with_images( $images );

		if ( is_wp_error( $patterns_with_images ) ) {
			return new WP_Error( 'failed_to_set_pattern_images', __( 'Failed to set the pattern images.', 'woo-gutenberg-products-block' ) );
		}

		$patterns_with_images_and_content = $this->get_patterns_with_content( $ai_connection, $token, $patterns_with_images, $business_description );

		if ( is_wp_error( $patterns_with_images_and_content ) ) {
			return new WP_Error( 'failed_to_set_pattern_content', __( 'Failed to set the pattern content.', 'woo-gutenberg-products-block' ) );
		}

		if ( get_option( self::WC_BLOCKS_PATTERNS_CONTENT ) === $patterns_with_images_and_content ) {
			return true;
		}

		$updated_content = update_option( self::WC_BLOCKS_PATTERNS_CONTENT, $patterns_with_images_and_content );

		if ( ! $updated_content ) {
			return new WP_Error( 'failed_to_update_patterns_content', __( 'Failed to update patterns content.', 'woo-gutenberg-products-block' ) );
		}

		return $updated_content;
	}

	/**
	 * Returns the patterns with images.
	 *
	 * @param array $images The array of images.
	 *
	 * @return array|WP_Error The patterns with images.
	 */
	private function get_patterns_with_images( $images ) {
		$patterns_dictionary = $this->get_patterns_dictionary();

		if ( is_wp_error( $patterns_dictionary ) ) {
			return $patterns_dictionary;
		}

		$patterns_with_images = array();

		foreach ( $patterns_dictionary as $pattern ) {
			if ( ! $this->pattern_has_images( $pattern ) ) {
				$patterns_with_images[] = $pattern;
				continue;
			}

			list( $images, $alts ) = $this->get_images_for_pattern( $pattern, $images );
			if ( empty( $images ) ) {
				$patterns_with_images[] = $pattern;
				continue;
			}

			$pattern['images'] = $images;

			$string = wp_json_encode( $pattern );

			foreach ( $alts as $i => $alt ) {
				$alt    = empty( $alt ) ? 'the text should be related to the store description but generic enough to adapt to any image' : $alt;
				$string = str_replace( "{image.$i}", $alt, $string );
			}

			$pattern = json_decode( $string, true );

			$patterns_with_images[] = $pattern;
		}

		return $patterns_with_images;
	}

	/**
	 * Returns the patterns with AI generated content.
	 *
	 * @param Connection      $ai_connection The AI connection.
	 * @param string|WP_Error $token The JWT token.
	 * @param array           $patterns The array of patterns.
	 * @param string          $business_description The business description.
	 *
	 * @return array|WP_Error The patterns with AI generated content.
	 */
	private function get_patterns_with_content( $ai_connection, $token, $patterns, $business_description ) {
		if ( is_wp_error( $token ) ) {
			return $token;
		}

		$patterns_with_content = $patterns;

		$prompts = array();
		foreach ( $patterns_with_content as $pattern ) {
			$prompt  = sprintf( 'Given the following store description: "%s", and the following JSON file representing the content of the "%s" pattern: %s.\n', $business_description, $pattern['name'], wp_json_encode( $pattern['content'] ) );
			$prompt .= "Replace the titles, descriptions and button texts in each 'default' key using the prompt in the corresponding 'ai_prompt' key by a text that is related to the previous store description (but not the exact text) and matches the 'ai_prompt', the length of each replacement should be similar to the 'default' text length. The response should be only a JSON string, with absolutely no intro or explanations.";

			$prompts[] = $prompt;
		}

		$responses = $ai_connection->fetch_ai_responses( $token, $prompts );

		foreach ( $responses as $key => $response ) {
			// If the AI response is invalid, we skip the pattern and keep the default content.
			if ( is_wp_error( $response ) || empty( $response ) ) {
				continue;
			}

			if ( ! isset( $response['completion'] ) ) {
				continue;
			}

			$pattern_content = json_decode( $response['completion'], true );
			if ( ! is_null( $pattern_content ) ) {
				$patterns_with_content[ $key ]['content'] = $pattern_content;
			}
		}

		return $patterns_with_content;
	}

	/**
	 * Get the Patterns Dictionary.
	 *
	 * @return mixed|WP_Error|null
	 */
	private function get_patterns_dictionary() {
		$patterns_dictionary = plugin_dir_path( __FILE__ ) . 'dictionary.json';

		if ( ! file_exists( $patterns_dictionary ) ) {
			return new WP_Error( 'missing_patterns_dictionary', __( 'The patterns dictionary is missing.', 'woo-gutenberg-products-block' ) );
		}

		return wp_json_file_decode( $patterns_dictionary, array( 'associative' => true ) );
	}

	/**
	 * Returns whether the pattern has images.
	 *
	 * @param array $pattern The array representing the pattern.
	 *
	 * @return bool True if the pattern has images, false otherwise.
	 */
	private function pattern_has_images( array $pattern ): bool {
		return isset( $pattern['images_total'] ) && $pattern['images_total'] > 0;
	}

	/**
	 * Returns the images for the given pattern.
	 *
	 * @param array $pattern         The array representing the pattern.
	 * @param array $selected_images The array of images.
	 *
	 * @return array An array containing an array of the images in the first position and their alts in the second.
	 */
	private function get_images_for_pattern( array $pattern, array $selected_images ): array {
		$alts   = array();
		$images = array();

		if ( count( $selected_images ) < $pattern['images_total'] ) {
			return array( $images, $alts );
		}

		foreach ( $selected_images as $selected_image ) {
			if ( ! isset( $selected_image['alt'] ) || ! isset( $selected_image['src']['large'] ) ) {
				continue;
			}

			$images[] = $selected_image['src']['large'];
			$alts[]   = $selected_image['alt'];
		}

		return array( $images, $alts );
	}
}
