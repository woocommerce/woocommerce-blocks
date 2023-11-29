<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\InteractivityComponents\Dropdown;

/**
 * CollectionAttributeFilter class.
 */
final class CollectionActiveFilters extends AbstractBlock {

	const LIST_TEMPLATE = '<li><span class="wc-block-active-filters__list-item-type">%1$s: </span><ul>%2$s</ul></li>';
	const ITEM_TEMPLATE = '<li class="wc-block-active-filters__list-item">
		<span class="wc-block-active-filters__list-item-name">
			<button class="wc-block-active-filters__list-item-remove" %3$s>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="wc-block-components-chip__remove-icon" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg>
				<span class="screen-reader-text">%2$s</span>
			</button>
			%1$s
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
		$active_filters = apply_filters( 'collection_active_filters_data', array(), $this->get_filter_query_params( $block->context['queryId'] ) );

		if ( empty( $active_filters ) ) {
			return $content;
		}

		$filter_content = array_reduce( $active_filters, function( $acc, $filter ) {

			$items_content = array_reduce( $filter['options' ], function( $acc, $option ) {

				$attributes = array_reduce(
					array_keys( $option['attributes'] ),
					function( $acc, $key ) use ( $option ) {
						$acc .= sprintf( ' %1$s="%2$s"', $key, $option['attributes'][ $key ] );
						return $acc;
					},
					'' );

				$acc .= sprintf(
					self::ITEM_TEMPLATE,
					$option['title'],
					sprintf( 'Remove %s filter', $option['title'] ),
					$attributes
				);

				return $acc;
			}, '' );

			$acc .= sprintf(
				self::LIST_TEMPLATE,
				$filter['type'],
				$items_content
			);

			return $acc;
		}, '' );

		return sprintf(
			'<div %1$s><ul class="wc-block-active-filters__list">%2$s</ul></div>',
			get_block_wrapper_attributes(
				array(
					'class' => 'wc-block-active-filters',
				)
			),
			$filter_content
		);
	}

	/**
	 * Parse the filter parameters from the URL.
	 *
	 * @param int $query_id Query ID.
	 * @return array Parsed filter params.
	 */
	private function get_filter_query_params( $query_id ) {
		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '';

		$parsed_url   = wp_parse_url( esc_url_raw( $request_uri ) );

		parse_str( $parsed_url['query'], $params );

		return $params;
	}
}
