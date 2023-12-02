<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\InteractivityComponents\CheckboxList;
use Automattic\WooCommerce\Blocks\InteractivityComponents\Dropdown;

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
		$display_style = $attributes['displayStyle'] ?? 'list';

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Nonce verification is not required here.
		$selected_ratings_query_param = isset( $_GET[ self::RATING_FILTER_QUERY_VAR ] ) ? sanitize_text_field( wp_unslash( $_GET[ self::RATING_FILTER_QUERY_VAR ] ) ) : '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'data-wc-interactive' => 'woocommerce/collection-rating-filter',
			)
		);

		$input = 'list' === $display_style ? CheckboxList::render(
			array(
				'items'     => $this->get_checkbox_list_items( $rating_counts, $selected_ratings_query_param ),
				'on_change' => 'woocommerce/collection-rating-filter::actions.onCheckboxChange',
			)
		) : Dropdown::render(
			$this->get_dropdown_props( $rating_counts, $selected_ratings_query_param )
		);

		return sprintf(
			'<div %1$s>
				<div class="wc-block-rating-filter__controls">%2$s</div>
				<div class="wc-block-rating-filter__actions"></div>
			</div>',
			$wrapper_attributes,
			$input
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

	/**
	 * Get the checkbox list items.
	 *
	 * @param array  $rating_counts    The rating counts.
	 * @param string $selected_ratings_query The url query param for selected ratings.
	 * @return array
	 */
	private function get_checkbox_list_items( $rating_counts, $selected_ratings_query ) {
		$ratings_array = explode( ',', $selected_ratings_query );

		return array_map(
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
	}

	/**
	 * Get the dropdown props.
	 *
	 * @param mixed $rating_counts The rating counts.
	 * @param mixed $selected_ratings_query The url query param for selected ratings.
	 * @return array<array-key, array>
	 */
	private function get_dropdown_props( $rating_counts, $selected_ratings_query ) {
		$ratings_array = explode( ',', $selected_ratings_query );

		$selected_item = $ratings_array[0] ? array(
			/* translators: %d is referring to the average rating value */
			'label' => sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-products-block' ), $ratings_array[0] ),
			'value' => (int) $ratings_array[0],
		) : array(
			'label' => null,
			'value' => null,
		);

		return array(
			'items'         => array_map(
				function ( $rating ) {
					$rating_str = (string) $rating['rating'];
					return array(
						/* translators: %d is referring to the average rating value */
						'label' => sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-products-block' ), $rating_str ),
						'value' => $rating['rating'],
					);
				},
				$rating_counts
			),
			'selected_item' => $selected_item,
			'action'        => 'woocommerce/collection-rating-filter::actions.onDropdownChange',
		);
	}


}
