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
	 * The pattern contents that can be updated by the AI.
	 */
	const PATTERN_CONTENTS = [ 'titles', 'descriptions', 'buttons' ];

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
	public function get_patterns_with_content( $ai_connection, $token, $patterns, $business_description ) {
		if ( is_wp_error( $token ) ) {
			return $token;
		}

		$prompts = $this->prepare_prompts( $patterns, $business_description );

		$responses = $ai_connection->fetch_ai_responses( $token, $prompts );
		if ( is_wp_error( $responses ) ) {
			return $responses;
		}

		return $this->integrate_ai_responses( $patterns, $responses );
	}

	/**
	 * Prepare prompts for the AI
	 *
	 * @param array  $patterns The array of patterns.
	 * @param string $business_description The business description.
	 *
	 * @return array
	 */
	private function prepare_prompts( $patterns, $business_description ) {
		$prompts = [];
		foreach ( $patterns as $pattern ) {
			if ( empty( $pattern['content'] ) ) {
				continue;
			}

			foreach ( self::PATTERN_CONTENTS as $content_type ) {
				$prompt = $this->construct_prompt( $pattern, $content_type, $business_description );
				if ( $prompt ) {
					$prompts[] = $prompt;
				}
			}
		}

		return $prompts;
	}

	/**
	 * Construct an individual prompt
	 *
	 * @param array  $pattern The array of patterns.
	 * @param string $content_type The content type.
	 * @param string $business_description The business description.
	 *
	 * @return string|null
	 */
	private function construct_prompt( $pattern, $content_type, $business_description ) {
		if ( isset( $pattern['content'][ $content_type ][0]['ai_prompt'] ) ) {
			$individual_prompt = $pattern['content'][ $content_type ][0]['ai_prompt'];
			$pattern_json      = wp_json_encode( $pattern['content'][ $content_type ] );

			return sprintf(
				"Given the following store description: \"%s\", and the following JSON string representing the %s of the \"%s\" pattern: %s.\n Replace the texts in each 'default' key using the following prompt '%s' with a text that is related to the previous store description (but not the exact text) and matches the 'ai_prompt', the length of each replacement should be similar to the 'default' text length. The text should not be written in first-person. The response should be only a JSON string, with absolutely no intro or explanations.",
				$business_description,
				$content_type,
				$pattern['slug'],
				$pattern_json,
				$individual_prompt
			);
		}

		return null;
	}

	/**
	 * Integrate AI responses into patterns
	 *
	 * @param array          $patterns The array of patterns.
	 * @param array|WP_Error $responses The array of responses.
	 *
	 * @return mixed
	 */
	private function integrate_ai_responses( $patterns, $responses ) {
		foreach ( $responses as $response_key => $response ) {
			if ( is_wp_error( $response ) || empty( $response['completion'] ) ) {
				continue;
			}

			$this->update_pattern_with_response( $patterns, $response );
		}

		return $patterns;
	}

	/**
	 * Update the specific pattern with the AI response
	 *
	 * @param array          $patterns The array of patterns.
	 * @param array|WP_Error $response The array of responses.
	 *
	 * @return void
	 */
	private function update_pattern_with_response( &$patterns, $response ) {
		$prompt_used = $response['previous_messages'][0]['content'] ?? '';
		if ( empty( $prompt_used ) ) {
			return;
		}

		foreach ( $patterns as $key => &$pattern ) {
			if ( strpos( $prompt_used, $pattern['slug'] ) !== false ) {
				$this->update_pattern_content_with_ai( $pattern, $prompt_used, $response );
			}
		}
	}

	/**
	 * Update the content of a pattern based on the AI's response
	 *
	 * @param array  $pattern The array of patterns.
	 * @param string $prompt_used The prompt used.
	 * @param array  $response The array of responses.
	 *
	 * @return void
	 */
	private function update_pattern_content_with_ai( &$pattern, $prompt_used, $response ) {
		foreach ( self::PATTERN_CONTENTS as $content_type ) {
			if ( strpos( $prompt_used, $content_type ) !== false ) {
				$ai_content_generated = json_decode( $response['completion'], true );
				if ( json_last_error() === JSON_ERROR_NONE ) {
					$pattern['content'][ $content_type ] = $ai_content_generated;
				}
			}
		}
	}

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

		$patterns_ai_data_post = PatternsHelper::get_patterns_ai_data_post();

		if ( isset( $patterns_ai_data_post->post_content ) && json_decode( $patterns_ai_data_post->post_content ) === $patterns_with_images_and_content ) {
			return true;
		}

		$updated_content = PatternsHelper::upsert_patterns_ai_data_post( $patterns_with_images_and_content );

		if ( is_wp_error( $updated_content ) ) {
			return new WP_Error( 'failed_to_update_patterns_content', __( 'Failed to update patterns content.', 'woo-gutenberg-products-block' ) );
		}

		return $updated_content;
	}

	/**
	 * Returns the patterns with images.
	 *
	 * @param array $selected_images The array of images.
	 *
	 * @return array|WP_Error The patterns with images.
	 */
	private function get_patterns_with_images( $selected_images ) {
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

			list( $images, $alts ) = $this->get_images_for_pattern( $pattern, $selected_images );
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
		$images = array();
		$alts   = array();
		foreach ( $selected_images as $selected_image ) {
			if ( ! isset( $selected_image['title'] ) ) {
				continue;
			}

			if ( ! isset( $selected_image['URL'] ) ) {
				continue;
			}

			if ( str_contains( '.jpeg', $selected_image['title'] ) ) {
				continue;
			}

			$expected_image_format = $pattern['images_format'] ?? 'portrait';
			$selected_image_format = $this->get_selected_image_format( $selected_image );

			if ( $selected_image_format !== $expected_image_format ) {
				continue;
			}

			$images[] = $selected_image['URL'];
			$alts[]   = $selected_image['title'];
		}

		return array( $images, $alts );
	}

	/**
	 * Returns the selected image format. Defaults to landscape.
	 *
	 * @param array $selected_image The selected image to be assigned to the pattern.
	 *
	 * @return string The selected image format.
	 */
	private function get_selected_image_format( $selected_image ) {
		if ( ! isset( $selected_image['width'], $selected_image['height'] ) ) {
			return 'portrait';
		}

		return $selected_image['width'] === $selected_image['height'] ? 'square' : ( $selected_image['width'] > $selected_image['height'] ? 'landscape' : 'portrait' );
	}
}
