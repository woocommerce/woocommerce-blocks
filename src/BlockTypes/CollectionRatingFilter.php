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

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $stock_statuses  Any stock statuses that currently are available from the block.
	 *                               Note, this will be empty in the editor context when the block is
	 *                               not in the post content on editor load.
	 */
	protected function enqueue_data( array $stock_statuses = [] ) {

	}

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

		$checkbox_list_items = array_map(
			function( $rating ) {
				return array(
					'id'      => 'rating-' . $rating,
					'checked' => true,
					'label'   => $this->render_rating_label( $rating ),
					'value'   => $rating,
				);
			},
			range( 1, 5 )
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
