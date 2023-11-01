<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\InteractivityComponents\Dropdown;

/**
 * CollectionStockFilter class.
 */
final class CollectionStockFilter extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'collection-stock-filter';

	const STOCK_STATUS_QUERY_VAR = 'filter_stock_status';

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $stock_statuses  Any stock statuses that currently are available from the block.
	 *                               Note, this will be empty in the editor context when the block is
	 *                               not in the post content on editor load.
	 */
	protected function enqueue_data( array $stock_statuses = [] ) {
		parent::enqueue_data( $stock_statuses );
		$this->asset_data_registry->add( 'stockStatusOptions', wc_get_product_stock_status_options(), true );
		$this->asset_data_registry->add( 'hideOutOfStockItems', 'yes' === get_option( 'woocommerce_hide_out_of_stock_items' ), true );
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
		$stock_status_counts = $block->context['collectionData']['stock_status_counts'] ?? [];
		$wrapper_attributes  = get_block_wrapper_attributes();

		wc_store(
			array(
				'state' => array(
					'filters' => array(
						'stockStatus'   => $stock_status_counts,
						'activeFilters' => '',
					)
				),
			)
		);

		return sprintf(
			'<div %1$s>
				<div class="wc-block-stock-filter__controls">%2$s</div>
				<div class="wc-block-stock-filter__actions"></div>
			</div>',
			$wrapper_attributes,
			$this->get_stock_filter_html( $stock_status_counts, $attributes, $block ),
		);
	}

	/**
	 * Stock filter HTML
	 *
	 * @param array    $data       Block data. Default empty array.
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	private function get_stock_filter_html( $data, $attributes, $block ) {
		$display_style  = $attributes['displayStyle'] ?? 'list';
		$select_type    = $attributes['selectType'] ?? 'multiple';
		$stock_statuses = wc_get_product_stock_status_options();
		
		$list_items = array_map(function($item) use ($stock_statuses) {
			return array(
				'label' => $stock_statuses[$item->status],
				'value' => $item->status,
			);
		}, $data);
		ob_start();
		?>

		<?php if ( 'list' === $display_style ) : ?>
			<div class="wc-block-stock-filter style-list">
				<ul class="wc-block-checkbox-list wc-block-components-checkbox-list wc-block-stock-filter-list">
					<?php foreach ( $data as $obj ) { ?>
						<li>
							<div class="wc-block-components-checkbox wc-block-checkbox-list__checkbox">
								<label for="<?php echo esc_attr( $obj->status ); ?>">
									<input id="<?php echo esc_attr( $obj->status ); ?>" class="wc-block-components-checkbox__input" type="checkbox" aria-invalid="false" data-wc-on--change="actions.filters.updateProducts" value="<?php echo esc_attr( $obj->status ); ?>">
										<svg class="wc-block-components-checkbox__mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20">
											<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
										</svg>
										<span class="wc-block-components-checkbox__label">
											<?php echo esc_html( $stock_statuses[ $obj->status ] ); ?>
											<span class="wc-filter-element-label-list-count">
												<span aria-hidden="true">
													<?php echo esc_html( $obj->count ); ?>
												</span>
												<span class="screen-reader-text">
													<?php printf( _n( '%s product', '%s products', $obj->count, 'woo-gutenberg-products-block' ), number_format_i18n( $obj->count ) ); ?>
												</span>
											</span>
										</span>
								</label>
							</div>
						</li>
					<?php } ?>
				</ul>
			</div>
		<?php endif; ?>

		<?php if ( 'dropdown' === $display_style ) : ?>
			<?php echo Dropdown::render( array( 'items' => $list_items, 'placeholder' =>  'Select stock status', 'on_change_effect' => 'effects.filters.updateProductsFromSingleDropdownChoice' )); ?>
		<?php endif; ?>
			
		<?php
		return ob_get_clean();
	}
}
