<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * CollectionAttributeFilter class.
 */
final class CollectionAttributeFilter extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'collection-attribute-filter';

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content    Block content.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		if (
			is_admin() ||
			empty( $block->context['collectionData']['attribute_counts'] ) ||
			empty( $attributes['attributeId'] )
		) {
			return $content;
		}

		$product_attribute = wc_get_attribute( $attributes['attributeId'] );

		$attribute_counts = array_reduce(
			$block->context['collectionData']['attribute_counts'],
			function( $acc, $count ) {
				$acc[ $count['term'] ] = $count['count'];
				return $acc;
			},
			[] );

		$attribute_terms = get_terms( array(
			'taxonomy' => $product_attribute->slug,
			'include' => array_keys( $attribute_counts ),
		) );

		$attribute_options = array_map( function( $term ) use( $attribute_counts ) {
			$term = (array) $term;
			$term['count'] = $attribute_counts[$term['term_id']];
			return $term;
		}, $attribute_terms );

		$filter_content = $attributes['displayStyle'] === 'dropdown' ? $this->render_attribute_dropdown( $attribute_options, $attributes ) : $this->render_attribute_list( $attribute_options, $attributes );

		return sprintf(
			'<div %1$s>%2$s</div>',
			get_block_wrapper_attributes(),
			$filter_content
		);
	}

	private function render_attribute_dropdown( $options, $attributes ) {

	}

	private function render_attribute_list( $options, $attributes ) {
		ob_start();
		echo '<ul class="wc-block-checkbox-list wc-block-components-checkbox-list wc-block-stock-filter-list">';
		foreach ( $options as $option ) {
			printf(
				$this->get_list_item_template( $attributes ),
				$option['slug'] . '-' . $option['term_id'],
				$option['name'],
				$option['count'],
				sprintf( _n( '%d product', '%d products', $option['count'], 'woo-gutenberg-products-block' ), $option['count'] )
			);
		}
		echo '</ul>';
		return ob_get_clean();
	}

	private function get_list_item_template( $attributes ) {
		if ( ! $attributes['showCounts'] ) {
			return '<li>
				<div class="wc-block-components-checkbox wc-block-checkbox-list__checkbox">
					<label for="%1$s">
						<input id="%1$s" class="wc-block-components-checkbox__input" type="checkbox" aria-invalid="false">
						<svg class="wc-block-components-checkbox__mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
						<span class="wc-block-components-checkbox__label">%2$s</span>
					</label>
				</div>
			</li>';
		}

		return '<li>
			<div class="wc-block-components-checkbox wc-block-checkbox-list__checkbox">
				<label for="%1$s">
					<input id="%1$s" class="wc-block-components-checkbox__input" type="checkbox" aria-invalid="false">
					<svg class="wc-block-components-checkbox__mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
					<span class="wc-block-components-checkbox__label">
						%2$s
						<span class="wc-filter-element-label-list-count">
							<span aria-hidden="true">%3$s</span>
							<span class="screen-reader-text">%4$s</span>
						</span>
					</span>
				</label>
			</div>
		</li>';
	}
}
