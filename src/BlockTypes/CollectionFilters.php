<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Domain\Services\Hydration;

/**
 * CollectionFilters class.
 */
final class CollectionFilters extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'collection-filters';

	/**
	 * Mapping inner blocks to CollectionData API parameters.
	 *
	 * @var array
	 */
	protected $collection_data_params_mapping = array(
		'calculate_price_range'         => 'collection-price-filter',
		'calculate_stock_status_counts' => 'collection-stock-filter',
		'calculate_attribute_counts'    => 'collection-attribute-filter',
		'calculate_rating_counts'       => 'collection-rating-filter',
	);

	/**
	 * Cache the current response from the API.
	 *
	 * @var array
	 */
	private $current_response = null;

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return null;
	}

	/**
	 * Initialize this block type.
	 *
	 * - Hook into WP lifecycle.
	 * - Register the block with WordPress.
	 */
	protected function initialize() {
		parent::initialize();
		add_action( 'render_block_context', array( $this, 'modify_inner_blocks_context' ), 10, 3 );
	}

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_data( array $attributes = [] ) {
		parent::enqueue_data( $attributes );

		if ( ! is_admin() ) {
			wc_store(
				array(
					'state' => array(
						'filters' => $this->current_response,
					),
				)
			);
			/**
			 * At this point, WP starts rendering the Collection Filters block,
			 * we can safely unset the current response.
			 */
			$this->current_response = null;
		}
	}

	/**
	 * Modify the context of inner blocks.
	 *
	 * @param array    $context The block context.
	 * @param array    $parsed_block The parsed block.
	 * @param WP_Block $parent_block The parent block.
	 * @return array
	 */
	public function modify_inner_blocks_context( $context, $parsed_block, $parent_block ) {
		if (
			is_admin() ||
			! is_a( $parent_block, 'WP_Block' ) ||
			! isset( $context['filterData'] )
		) {
			return $context;
		}

		/**
		 * The first time we reach here, WP is rendering the first direct child
		 * of CollectionFilters block. We hydrate and cache the collection data
		 * response for other inner blocks to use.
		 */
		if ( ! isset( $this->current_response ) ) {
			$this->current_response = $this->get_filter_data(
				$this->get_aggregated_collection_data( $parent_block )
			);
		}

		if ( ! empty( $this->current_response ) ) {
			$context['filterData'] = $this->current_response;
		}

		return $context;
	}

	/**
	 * Get the aggregated collection data from the API.
	 * Loop through inner blocks and build a query string to pass to the API.
	 *
	 * @param WP_Block $block The block instance.
	 * @return array
	 */
	private function get_aggregated_collection_data( $block ) {
		$inner_blocks = $this->get_inner_blocks_recursive( $block->inner_blocks );

		$collection_data_params = array_map(
			function( $block_name ) use ( $inner_blocks ) {
				return array_reduce(
					$inner_blocks,
					function( $acc, $inner_block ) use ( $block_name ) {
						return $acc || strpos( $inner_block, $block_name ) !== false;
					},
					false
				);
			},
			$this->collection_data_params_mapping
		);

		if ( empty( array_filter( $collection_data_params ) ) ) {
			return array();
		}

		$products_params = $this->get_formatted_products_params( $block->context['query'] );

		$response = Package::container()->get( Hydration::class )->get_rest_api_response_data(
			add_query_arg(
				array_merge(
					$products_params,
					$collection_data_params,
				),
				'/wc/store/v1/products/collection-data'
			)
		);

		if ( ! empty( $response['body'] ) ) {
			return $response['body'];
		}

		return array();
	}

	/**
	 * Get all inner blocks recursively.
	 *
	 * @param WP_Block_List $inner_blocks The block to get inner blocks from.
	 * @param array         $results      The results array.
	 *
	 * @return array
	 */
	private function get_inner_blocks_recursive( $inner_blocks, &$results = array() ) {
		if ( is_a( $inner_blocks, 'WP_Block_List' ) ) {
			foreach ( $inner_blocks as $inner_block ) {
				dd( $inner_block );
				$results[] = $inner_block->name;
				$this->get_inner_blocks_recursive(
					$inner_block->inner_blocks,
					$results
				);
			}
		}

		return $results;
	}

	/**
	 * Get formatted products params for ProductCollectionData route from the
	 * query context.
	 *
	 * @param array $query The query context.
	 * @return array
	 */
	private function get_formatted_products_params( $query ) {
		$params = array();

		if ( empty( $query['isProductCollectionBlock'] ) ) {
			return $params;
		}

		/**
		 * The following params can be passed directly to Store API endpoints.
		 */
		$shared_params = array( 'exclude', 'offset', 'order', 'serach' );
		array_walk(
			$shared_params,
			function( $key ) use ( $query, &$params ) {
				$params[ $key ] = $query[ $key ] ?? '';
			}
		);

		/**
		 * The following params just need to transform the key, their value can
		 * be passed as it is to the Store API.
		 */
		$mapped_params = array(
			'orderBy'                       => 'orderby',
			'pages'                         => 'page',
			'parents'                       => 'parent',
			'perPage'                       => 'per_page',
			'woocommerceStockStatus'        => 'stock_status',
			'woocommerceOnSale'             => 'on_sale',
			'woocommerceHandPickedProducts' => 'include',
		);
		array_walk(
			$mapped_params,
			function( $mapped_key, $original_key ) use ( $query, &$params ) {
				$params[ $mapped_key ] = $query[ $original_key ] ?? '';
			}
		);

		/**
		 * The value of taxQuery and woocommerceAttributes need additional
		 * transformation to the shape that Store API accepts.
		 */
		$taxonomy_mapper = function( $key ) {
			$mapping = array(
				'product_tag' => 'tag',
				'product_cat' => 'category',
			);

			return $mapping[ $key ] ?? '_unstable_tax_' . $key;
		};

		if ( is_array( $query['taxQuery'] ) ) {
			array_walk(
				$query['taxQuery'],
				function( $terms, $taxonomy ) use ( $taxonomy_mapper, &$params ) {
					$params[ $taxonomy_mapper( $taxonomy ) ] = implode( ',', $terms );
				}
			);
		}

		if ( is_array( $query['woocommerceAttributes'] ) ) {
			array_walk(
				$query['woocommerceAttributes'],
				function( $attribute ) use ( &$params ) {
					$params['attributes'][] = array(
						'attribute' => $attribute['taxonomy'],
						'term_id'   => $attribute['termId'],
					);
				}
			);
		}

		/**
		 * Product Collection determines the product visibility based on stock
		 * statuses. We need to pass the catalog_visibility param to the Store
		 * API to make sure the product visibility is correct.
		 */
		$params['catalog_visibility'] = is_search() ? 'catalog' : 'visible';

		return array_filter( $params );
	}

	/**
	 * Prepare filter data for Interactivity API and inner blocks.
	 *
	 * @param array $collection_data The collection data.
	 * @return string
	 */
	private function get_filter_data( $collection_data ) {
		if ( empty( $collection_data ) ) {
			return array();
		}

		$price_range = $collection_data['price_range'];
		$min_range   = $price_range->min_price / 10 ** $price_range->currency_minor_unit;
		$max_range   = $price_range->max_price / 10 ** $price_range->currency_minor_unit;
		$min_price   = intval( get_query_var( 'min_price', $min_range ) );
		$max_price   = intval( get_query_var( 'max_price', $max_range ) );

		return array(
			'minPrice'          => $min_price,
			'maxPrice'          => $max_price,
			'formattedMinPrice' => wc_price( $min_price, array( 'decimals' => 0 ) ),
			'formattedMaxPrice' => wc_price( $max_price, array( 'decimals' => 0 ) ),
			'minRange'          => $min_range,
			'maxRange'          => $max_range,
		);
	}
}
