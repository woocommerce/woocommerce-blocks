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
	 * @param int $allowed_length Maximum allowed characters for summary.
	 * @return string
	 */
	public function get_summary( $allowed_length ) {
		$summary = $this->content;

		if ( $this->get_length( $summary ) > $allowed_length ) {
			$summary = $this->get_first_paragraph( $summary );
		}

		return \wc_format_content( $summary );
	}

	/**
	 * Get the character length of some content, ignoring HTML.
	 *
	 * @param string $content HTML Content.
	 * @return int Length
	 */
	protected function get_length( $content ) {
		return \strlen( \wp_strip_all_tags( $content ) );
	}

	/**
	 * Get the first paragraph, or a short excerpt, from some content.
	 *
	 * @param string $content HTML Content.
	 * @return string
	 */
	protected function get_first_paragraph( $content ) {
		$content_p = \wpautop( $content );

		return \strstr( $content_p, '</p>' ) ? \substr( $content_p, 0, \strpos( $content_p, '</p>' ) + 4 ) : \wc_trim_string( $content, 150 );
	}
}
