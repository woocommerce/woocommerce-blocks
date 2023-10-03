<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * CollectionStockFilter class.
 */
class CollectionStockFilter extends AbstractBlock {

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
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_data( array $stock_statuses = [] ) {
		parent::enqueue_data( $stock_statuses );
		$this->asset_data_registry->add( 'stockStatusOptions', wc_get_product_stock_status_options(), true );
		$this->asset_data_registry->add( 'hideOutOfStockItems', 'yes' === get_option( 'woocommerce_hide_out_of_stock_items' ), true );
	}

	/**
	 * Register the context.
	 */
	protected function get_block_type_uses_context() {
		return [ 'query', 'queryId', 'postId' ];
	}

	/**
	 * Get Stock status query variables values.
	 */
	public static function get_stock_status_query_var_values() {
		return array_keys( wc_get_product_stock_status_options() );
	}

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return array_merge( parent::get_block_type_style(), [ 'wc-blocks-packages-style' ] );
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
		$data = array( 'stockStatus' => 'instock' );

		wc_store(
			array(
				'state' => array(
					'filters' => $data,
				),
			)
		);

		return '<select name="stock_status" data-wc-on--change="actions.filters.updateProducts"><option value="instock">In Stock</option><option value="outofstock">Out of Stock</option></select>';
	}

	/**
	 * Stock filter HTML
	 *
	 */
	private function get_stock_filter_html( $data, $attributes ) {
<div class="wp-block-woocommerce-stock-filter"><div class="wc-block-stock-filter style-list"><ul class="wc-block-checkbox-list wc-block-components-checkbox-list wc-block-stock-filter-list"><li><div class="wc-block-components-checkbox wc-block-checkbox-list__checkbox"><label for="instock"><input id="instock" class="wc-block-components-checkbox__input" type="checkbox" aria-invalid="false"><svg class="wc-block-components-checkbox__mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg><span class="wc-block-components-checkbox__label">In stock<span class="wc-filter-element-label-list-count"><span aria-hidden="true">18</span><span class="screen-reader-text">18 products</span></span></span></label></div></li><li><div class="wc-block-components-checkbox wc-block-checkbox-list__checkbox"><label for="outofstock"><input id="outofstock" class="wc-block-components-checkbox__input" type="checkbox" aria-invalid="false"><svg class="wc-block-components-checkbox__mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg><span class="wc-block-components-checkbox__label">Out of stock<span class="wc-filter-element-label-list-count"><span aria-hidden="true">1</span><span class="screen-reader-text">1 product</span></span></span></label></div></li></ul></div><div class="wc-block-stock-filter__actions"></div></div>
	}
}
