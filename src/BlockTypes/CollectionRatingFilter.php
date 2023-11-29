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

		$checkbox_list_props = array(
			'items' => array(
				array(
					'id'      => 'rating-5',
					'checked' => true,
					'label'   => '5',
					'value'   => '5',
				),
				array(
					'id'      => 'rating-4',
					'checked' => true,
					'label'   => '4',
					'value'   => '4',
				),
				array(
					'id'      => 'rating-3',
					'checked' => true,
					'label'   => '3',
					'value'   => '3',
				),
				array(
					'id'      => 'rating-2',
					'checked' => true,
					'label'   => '2',
					'value'   => '2',
				),
				array(
					'id'      => 'rating-1',
					'checked' => true,
					'label'   => '1',
					'value'   => '1',
				),
			),
		);

		return CheckboxList::render( $checkbox_list_props );
	}


}
