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

		$prompts    = [];
		$result     = [];
		$group_size = 28;
		$i          = 0;
		foreach ( $patterns as $pattern ) {
			$slug    = $pattern['slug'];
			$content = $pattern['content'];
			$counter = 1;

			$result[ $slug ] = [];

			if ( isset( $content['titles'] ) ) {
				foreach ( $content['titles'] as $title ) {
					$result[ $slug ][ $counter ++ ] = $title['ai_prompt'];
				}
			}

			if ( isset( $content['descriptions'] ) ) {
				foreach ( $content['descriptions'] as $description ) {
					$result[ $slug ][ $counter ++ ] = $description['ai_prompt'];
				}
			}

			if ( isset( $content['buttons'] ) ) {
				foreach ( $content['buttons'] as $button ) {
					$result[ $slug ][ $counter ++ ] = $button['ai_prompt'];
				}
			}

			$i++;

			if ( $i === $group_size ) {
				$prompts[] = $result;
				$result    = [];
				$i         = 0;
			}
		}

		$expected_results_format = [];
		foreach ( $prompts as $prompt ) {
			$expected_result_format = [];

			foreach ( $prompt as $key => $values ) {
				$expected_result_format[ $key ] = [];

				foreach ( $values as $sub_key => $sub_value ) {
					$expected_result_format[ $key ][ $sub_key ] = '';
				}
			}

			$expected_results_format[] = $expected_result_format;
		}

		$i                 = 0;
		$formatted_prompts = [];
		foreach ( $prompts as $prompt ) {
			$formatted_prompts[] = sprintf(
				"Given the following business description '%s' and the following prompts: \n ```'%s'``` \n Generate new content based on the previously shared prompts and return them in the following format without any explanations, the returned results should never be the same as what was provided as the prompt: \n ```'%s'``` \n",
				$business_description,
				wp_json_encode( $prompt ),
				wp_json_encode( $expected_results_format[ $i ] )
			);
			$i ++;
		}

		$ai_responses = $ai_connection->fetch_ai_responses( $token, $formatted_prompts, 60 );

		foreach ( $ai_responses as $ai_response ) {
			if ( is_wp_error( $ai_response ) ) {
				return $ai_response;
			}

			if ( ! isset( $ai_response['completion'] ) ) {
				return new WP_Error( 'ai_response_missing', __( 'The AI response is missing.', 'woo-gutenberg-products-block' ) );
			}
		}

		foreach ( $patterns as $i => $pattern ) {
			$pattern_slug    = $pattern['slug'];
			$pattern_content = $pattern['content'];

			foreach ( $ai_responses as $ai_response ) {
				$ai_response = json_decode( $ai_response['completion'], true );

				if ( isset( $ai_response[ $pattern_slug ] ) ) {
					$ai_response_content = $ai_response[ $pattern_slug ];

					$counter = 1;
					if ( isset( $pattern_content['titles'] ) ) {
						foreach ( $pattern_content['titles'] as $j => $title ) {
							$patterns[ $i ]['content']['titles'][ $j ]['default'] = $ai_response_content[ $counter ];

							$counter ++;
						}
					}

					if ( isset( $pattern_content['descriptions'] ) ) {
						foreach ( $pattern_content['descriptions'] as $j => $description ) {
							$patterns[ $i ]['content']['descriptions'][ $j ]['default'] = $ai_response_content[ $counter ];

							$counter ++;
						}
					}

					if ( isset( $pattern_content['buttons'] ) ) {
						foreach ( $pattern_content['buttons'] as $j => $button ) {
							$patterns[ $i ]['content']['buttons'][ $j ]['default'] = $ai_response_content[ $counter ];

							$counter ++;
						}
					}
				}
			}
		}

		return $patterns;
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

		$last_business_description = get_option( 'last_business_description_with_ai_content_generated' );

		if ( $last_business_description === $business_description ) {
			if ( is_string( $business_description ) && is_string( $last_business_description ) ) {
				return true;
			} else {
				return new \WP_Error( 'business_description_not_found', __( 'No business description provided for generating AI content.', 'woo-gutenberg-products-block' ) );
			}
		}

		if ( 0 === count( $images ) ) {
			$images = get_transient( 'woocommerce_ai_managed_images' );
		}

		if ( empty( $images ) ) {
			return new WP_Error( 'no_images_found', __( 'No images found.', 'woo-gutenberg-products-block' ) );
		}

		// This is required in case something interrupts the execution of the script and the endpoint is called again on retry.
		set_transient( 'woocommerce_ai_managed_images', $images, 60 );

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
		$patterns_dictionary = self::get_patterns_dictionary();

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
	public static function get_patterns_dictionary() {
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
