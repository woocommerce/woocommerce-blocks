<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\InteractivityComponents\CheckboxList;

/**
 * Collection Rating Filter Block
 *
 * @package Automattic\WooCommerce\Blocks\BlockTypes
 */
final class CollectionRatingFilter extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'collection-rating-filter';

	const RATING_FILTER_QUERY_VAR = 'rating_filter';

	/**
	 * Include and render the block.
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string   $content    Block content. Default empty string.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		// don't render if its admin, or ajax in progress.
		if ( is_admin() || wp_doing_ajax() ) {
			return '';
		}

		$rating_counts = $block->context['collectionData']['rating_counts'] ?? [];

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Nonce verification is not required here.
		$selected_ratings = isset( $_GET[ self::RATING_FILTER_QUERY_VAR ] ) ? sanitize_text_field( wp_unslash( $_GET[ self::RATING_FILTER_QUERY_VAR ] ) ) : '';
		$ratings_array    = explode( ',', $selected_ratings );

		$checkbox_list_items = array_map(
			function( $rating ) use ( $ratings_array ) {
				$rating_str = (string) $rating['rating'];
				return array(
					'id'      => 'rating-' . $rating_str,
					'checked' => in_array( $rating_str, $ratings_array, true ),
					'label'   => $this->render_rating_label( (int) $rating_str ),
					'value'   => $rating['rating'],
				);
			},
			$rating_counts
		);

		return CheckboxList::render(
			array(
				'items'     => $checkbox_list_items,
				'on_change' => 'woocommerce/collection-rating-filter::actions.updateSelectedFilters',
			)
		);
	}

	/**
	 * Render the rating label.
	 *
	 * @param int $rating The rating to render.
	 * @return string|false
	 */
	private function render_rating_label( $rating ) {
		$width = $rating * 20;
		ob_start();
		?>
		<div class="wc-block-components-product-rating">
			<div class="wc-block-components-product-rating__stars" role="img" aria-label="Rated <?php echo esc_attr( $rating ); ?> out of 5">
				<span style="width: <?php echo esc_attr( $width ); ?>%">
					Rated <strong class="rating"><?php echo esc_html( $rating ); ?></strong> out of 5
				</span>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}


}
