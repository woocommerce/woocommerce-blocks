<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\InteractivityComponents\Dropdown;

/**
 * CollectionAttributeFilter class.
 */
final class CollectionActiveFilters extends AbstractBlock {

	const LIST_TEMPLATE = '<li><span class="wc-block-active-filters__list-item-type">%1$s: </span><ul>%2$s</ul></li>';
	const LIST_ITEM_TEMPLATE = '<li class="wc-block-active-filters__list-item">
		<span class="wc-block-active-filters__list-item-name">
			<button class="wc-block-active-filters__list-item-remove" %3$s>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="wc-block-components-chip__remove-icon" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg>
				<span class="screen-reader-text">%2$s</span>
			</button>
			%1$s
		</span>
	</li>';
	const CHIP_ITEM_TEMPLATE = '<li class="wc-block-active-filters__list-item">
		<span class="is-removable wc-block-components-chip wc-block-components-chip--radius-large">
			<span aria-hidden="false" class="wc-block-components-chip__text">%1$s</span>
			<button class="wc-block-components-chip__remove" aria-label="%2$s" %3$s>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" role="img" class="wc-block-components-chip__remove-icon" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg>
			</button>
		</span>
	</li>';

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'collection-active-filters';

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content    Block content.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */

	protected function render( $attributes, $content, $block ) {
		/**
		 * Filters the active filter data provided by filter blocks.
		 *
		 *	$data = array(
		 *		<id> => array(
		 *			'type' => string,
		 *			'options' => array(
		 *				array(
		 *					'title' => string,
		 *					'attributes' => array(
		 *						<key> => string
		 *					)
		 *				)
		 *			)
		 *		),
		 *	);
		 *
		 * @param array $data   The active filters data
		 * @param array $params The query param parsed from the URL.
		 * @return array Active filters data.
		 */
		$active_filters = apply_filters( 'collection_active_filters_data', array(), $this->get_filter_query_params( $block->context['queryId'] ) );

		if ( empty( $active_filters ) ) {
			return $content;
		}

		$filter_content = array_reduce( $active_filters, function( $acc, $filter ) use ( $attributes ) {

			$items_content = array_reduce( $filter['options' ], function( $acc, $option ) use ( $attributes ) {

				$element_attributes = array_reduce(
					array_keys( $option['attributes'] ),
					function( $acc, $key ) use ( $option ) {
						$acc .= sprintf( ' %1$s="%2$s"', esc_attr( $key ), esc_attr( $option['attributes'][ $key ] ) );
						return $acc;
					},
					'' );

				$acc .= sprintf(
					$attributes['displayStyle'] === 'chips' ? self::CHIP_ITEM_TEMPLATE : self::LIST_ITEM_TEMPLATE,
					wp_kses_post( $option['title'] ),
					sprintf( 'Remove %s filter', esc_attr( strip_tags( $option['title'] ) ) ),
					$element_attributes
				);

				return $acc;
			}, '' );

			$acc .= sprintf(
				self::LIST_TEMPLATE,
				esc_attr( $filter['type'] ),
				$items_content
			);

			return $acc;
		}, '' );

		$clear_button = sprintf(
			'<button class="wc-block-active-filters__clear-all" data-wc-on--click="actions.clearAll">
				<span aria-hidden="true">%1$s</span>
				<span class="screen-reader-text">%2$s</span>
			</button>',
			__( 'Clear All', 'woo-gutenberg-products-block' ),
			__( 'Clear All Filters', 'woo-gutenberg-products-block' )
		);

		$context = array(
			'queryId' => $block->context['queryId'],
			'params'  => array_keys( $this->get_filter_query_params( $block->context['queryId'] ) ),
		);

		return sprintf(
			'<div %1$s>
				<ul class="wc-block-active-filters__list %3$s">%2$s</ul>
				%4$s
			</div>',
			get_block_wrapper_attributes(
				array(
					'class' => 'wc-block-active-filters',
					'data-wc-interactive' => wp_json_encode( array( 'namespace' => 'woocommerce/collection-active-filters' ) ),
					'data-wc-context' => wp_json_encode( $context ),
				)
			),
			$filter_content,
			$attributes['displayStyle'] === 'chips' ? 'wc-block-active-filters__list--chips' : '',
			$clear_button
		);
	}

	/**
	 * Parse the filter parameters from the URL.
	 *
	 * @param int $query_id Query ID.
	 * @return array Parsed filter params.
	 */
	private function get_filter_query_params( $query_id ) {
		// @todo Get the query params based on $query_id
		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '';

		$parsed_url   = wp_parse_url( esc_url_raw( $request_uri ) );

		if ( empty( $parsed_url['query'] ) ) {
			return array();
		}

		parse_str( $parsed_url['query'], $params );

		return $params;
	}
}
