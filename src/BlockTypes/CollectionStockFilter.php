<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

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
					'filters'       => $stock_status_counts,
					'activeFilters' => array(),
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
		ob_start();
		?>
			<div class="wc-block-stock-filter style-<?php echo esc_attr( $display_style ); ?>">
				<?php if ( 'list' === $display_style ) : ?>
					<ul class="wc-block-checkbox-list wc-block-components-checkbox-list wc-block-stock-filter-list">
						<?php foreach ( $data as $obj ) { ?>
							<li>
								<div class="wc-block-components-checkbox wc-block-checkbox-list__checkbox">
									<label for="<?php echo esc_attr( $obj->status ); ?>">
										<input id="<?php echo esc_attr( $obj->status ); ?>" class="wc-block-components-checkbox__input" type="checkbox" aria-invalid="false" data-wc-on--change="actions.filters.updateProducts" value="<?php echo esc_attr( $obj->status ); ?>">
											<svg class="wc-block-components-checkbox__mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
											<span class="wc-block-components-checkbox__label"><?php echo esc_html( $stock_statuses[ $obj->status ] ); ?>
												<span class="wc-filter-element-label-list-count"><span aria-hidden="true"><?php echo esc_html( $obj->count ); ?></span><span class="screen-reader-text"><?php printf( _n( '%s product', '%s products', $obj->count, 'woo-gutenberg-products-block' ), number_format_i18n( $obj->count ) ); ?></span></span>
											</span>
									</label>
								</div>
							</li>
						<?php } ?>
					</ul>
				<?php endif; ?>

				<?php if ( 'dropdown' === $display_style ) : ?>
					<div class="wc-blocks-components-form-token-field-wrapper single-selection"><div class="components-form-token-field" tabindex="-1"><label for="components-form-token-input-1" class="components-form-token-field__label"></label><div class="components-form-token-field__input-container" tabindex="-1"><input id="components-form-token-input-1" type="text" autocomplete="off" placeholder="Select stock status" class="components-form-token-field__input" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-describedby="components-form-token-suggestions-howto-1" value=""></div></div></div><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30" height="30" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>
				<?php endif; ?>
			</div>
		<?php
		return ob_get_clean();
	}
}
