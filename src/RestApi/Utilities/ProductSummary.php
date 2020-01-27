<?php
/**
 * Helper class to format a short summary of content for a product.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\Utilities;

defined( 'ABSPATH' ) || exit;

/**
 * Product Summary class.
 */
class ProductSummary {
	/**
	 * Original content from the product.
	 *
	 * @var string
	 */
	protected $content = '';

	/**
	 * Constructor.
	 *
	 * @param \WC_Product $product The product to generate a summary for.
	 */
	public function __construct( \WC_Product $product ) {
		$this->content = $product->get_short_description();

		if ( ! $this->content ) {
			$this->content = $product->get_description();
		}
	}

	/**
	 * Return the formatted summary.
	 *
	 * @param int $max_words Word limit for summary.
	 * @return string
	 */
	public function get_summary( $max_words = 25 ) {
		$summary = $this->content;

		if ( $max_words && $this->get_word_count( $summary ) > $max_words ) {
			$summary = $this->generate_summary( $summary, $max_words );
		}

		return \wc_format_content( $summary );
	}

	/**
	 * Get the word count.
	 *
	 * @param string $content HTML Content.
	 * @return int Length
	 */
	protected function get_word_count( $content ) {
		return \str_word_count( \wp_strip_all_tags( $content ) );
	}

	/**
	 * Get the first paragraph, or a short excerpt, from some content.
	 *
	 * @param string $content HTML Content.
	 * @param int    $max_words Maximum allowed words for summary.
	 * @return string
	 */
	protected function generate_summary( $content, $max_words ) {
		$content_p = \wpautop( $content );
		$paragraph = \strstr( $content_p, '</p>' ) ? \substr( $content_p, 0, \strpos( $content_p, '</p>' ) + 4 ) : $content_p;

		if ( $this->get_word_count( $paragraph ) > $max_words ) {
			return \wp_trim_words( $content, $max_words );
		}

		return $paragraph;
	}
}
