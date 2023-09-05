<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Domain\Services\Hydration;

/**
 * CollectionFilters class.
 */
class CollectionFilters extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'collection-filters';

	protected $mapping = array(
		'calculate_price_range' => 'woocommerce/collection-price-filter',
	);

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return null;
	}

	/**
	 * Get the frontend script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 *
	 * @return null This block has no frontend script.
	 */
	protected function get_block_type_script( $key = null ) {
		return null;
	}

	protected function initialize() {
		parent::initialize();
		add_action( 'render_block_context', array( $this, 'modify_inner_blocks_context' ), 10, 3 );
	}

	public function modify_inner_blocks_context( $context, $parsed_block, $parent_block ) {
		if (
			! is_a( $parent_block, 'WP_Block' ) ||
			$parent_block->name !== "woocommerce/{$this->block_name}" ||
			empty( $parent_block->inner_blocks )
		) {
			return $context;
		}

		$inner_blocks = [];

		do {
			$inner_blocks[] = $parent_block->inner_blocks->current()->name;
		} while ( $parent_block->inner_blocks->next() );

		$query = $parent_block->context['query'];

		$context['collectionData'] = Package::container()->get( Hydration::class )->get_rest_api_response_data(
			$this->build_api_path( $query, $inner_blocks )
		);

		return $context;
	}

	protected function build_api_path( $query, $inner_blocks ) {
		$args = [];

		foreach( $this->mapping as $key => $item ) {
			if ( in_array( $item, $inner_blocks, true ) ) {
				$args[ $key ] = true;
			}
		}

		return add_query_arg(
			$args,
			'/wc/store/v1/products/collection-data'
		);
	}
}
