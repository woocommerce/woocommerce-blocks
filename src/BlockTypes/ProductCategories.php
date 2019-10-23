<?php
/**
 * Product categories block.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * ProductCategories class.
 */
class ProductCategories extends AbstractDynamicBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-categories';

	/**
	 * Default attribute values, should match what's set in JS `registerBlockType`.
	 *
	 * @var array
	 */
	protected $defaults = array(
		'hasCount'       => true,
		'hasEmpty'       => false,
		'isDropdown'     => false,
		'isHierarchical' => true,
	);

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes() {
		return array_merge(
			parent::get_attributes(),
			array(
				'className'      => $this->get_schema_string(),
				'hasCount'       => $this->get_schema_boolean( true ),
				'hasEmpty'       => $this->get_schema_boolean( false ),
				'isDropdown'     => $this->get_schema_boolean( false ),
				'isHierarchical' => $this->get_schema_boolean( true ),
			)
		);
	}

	/**
	 * Render the Product Categories List block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public function render( $attributes = array(), $content = '' ) {
		$uid        = uniqid( 'product-categories-' );
		$categories = $this->get_categories( $attributes );

		if ( ! $categories ) {
			return '';
		}

		if ( ! empty( $content ) ) {
			// Deal with legacy attributes (before this was an SSR block) that differ from defaults.
			if ( strstr( $content, 'data-has-count="false"' ) ) {
				$attributes['hasCount'] = false;
			}
			if ( strstr( $content, 'data-is-dropdown="true"' ) ) {
				$attributes['isDropdown'] = true;
			}
			if ( strstr( $content, 'data-is-hierarchical="false"' ) ) {
				$attributes['isHierarchical'] = false;
			}
			if ( strstr( $content, 'data-has-empty="true"' ) ) {
				$attributes['hasEmpty'] = true;
			}
		}

		$output  = '<div class="wc-block-product-categories ' . esc_attr( $attributes['className'] ) . ' ' . ( $attributes['isDropdown'] ? 'is-dropdown' : 'is-list' ) . '">';
		$output .= ! empty( $attributes['isDropdown'] ) ? $this->renderDropdown( $categories, $attributes, $uid ) : $this->renderList( $categories, $attributes, $uid );
		$output .= '</div>';

		return $output;
	}

	/**
	 * Get categories (terms) from the db.
	 *
	 * @param array $attributes Block attributes. Default empty array.
	 * @return array
	 */
	protected function get_categories( $attributes ) {
		$hierarchical = wc_string_to_bool( $attributes['isHierarchical'] );
		$categories   = get_terms(
			'product_cat',
			[
				'hide_empty'   => ! $attributes['hasEmpty'],
				'pad_counts'   => true,
				'hierarchical' => true,
			]
		);

		if ( ! $categories ) {
			return [];
		}

		return $hierarchical ? $this->build_category_tree( $categories ) : $categories;
	}

	/**
	 * Build hierarchical tree of categories.
	 *
	 * @param array $categories List of terms.
	 * @return array
	 */
	protected function build_category_tree( $categories ) {
		$categories_by_parent = [];

		foreach ( $categories as $category ) {
			if ( ! isset( $categories_by_parent[ 'cat-' . $category->parent ] ) ) {
				$categories_by_parent[ 'cat-' . $category->parent ] = [];
			}
			$categories_by_parent[ 'cat-' . $category->parent ][] = $category;
		}

		$tree = $categories_by_parent['cat-0'];
		unset( $categories_by_parent['cat-0'] );

		foreach ( $tree as $category ) {
			if ( ! empty( $categories_by_parent[ 'cat-' . $category->term_id ] ) ) {
				$category->children = $this->fill_category_children( $categories_by_parent[ 'cat-' . $category->term_id ], $categories_by_parent );
			}
		}

		return $tree;
	}

	/**
	 * Build hierarchical tree of categories by appending children in the tree.
	 *
	 * @param array $categories List of terms.
	 * @param array $categories_by_parent List of terms grouped by parent.
	 * @return array
	 */
	protected function fill_category_children( $categories, $categories_by_parent ) {
		foreach ( $categories as $category ) {
			if ( ! empty( $categories_by_parent[ 'cat-' . $category->term_id ] ) ) {
				$category->children = $this->fill_category_children( $categories_by_parent[ 'cat-' . $category->term_id ], $categories_by_parent );
			}
		}
		return $categories;
	}

	/**
	 * Render the category list as a dropdown.
	 *
	 * @param array $categories List of terms.
	 * @param array $attributes Block attributes. Default empty array.
	 * @param int   $uid Unique ID for the rendered block, used for HTML IDs.
	 * @return string Rendered output.
	 */
	protected function renderDropdown( $categories, $attributes, $uid ) {
		$output = '
			<div class="wc-block-product-categories__dropdown">
				<label
				class="screen-reader-text"
					for="' . esc_attr( $uid ) . '-select"
				>
					' . esc_html__( 'Select a category', 'woo-gutenberg-products-block' ) . '
				</label>
				<select id="' . esc_attr( $uid ) . '-select">
					<option value="false" hidden>
						' . esc_html__( 'Select a category', 'woo-gutenberg-products-block' ) . '
					</option>
					' . $this->renderDropdownOptions( $categories, $attributes, $uid ) . '
				</select>
			</div>
			<button
				type="button"
				class="wc-block-product-categories__button"
				aria-label="' . esc_html__( 'Go to category', 'woo-gutenberg-products-block' ) . '"
				onclick="const url = document.getElementById( \'' . esc_attr( $uid ) . '-select\' ).value; if ( \'false\' !== url ) document.location.href = url;"
			>
				<svg
					aria-hidden="true"
					role="img"
					focusable="false"
					class="dashicon dashicons-arrow-right-alt2"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
				>
					<path d="M6 15l5-5-5-5 1-2 7 7-7 7z" />
				</svg>
			</button>
		';
		return $output;
	}

	/**
	 * Render dropdown options list.
	 *
	 * @param array $categories List of terms.
	 * @param array $attributes Block attributes. Default empty array.
	 * @param int   $uid Unique ID for the rendered block, used for HTML IDs.
	 * @param int   $depth Current depth.
	 * @return string Rendered output.
	 */
	protected function renderDropdownOptions( $categories, $attributes, $uid, $depth = 0 ) {
		$output = '';

		foreach ( $categories as $category ) {
			$output .= '
				<option value="' . esc_attr( get_term_link( $category->term_id, 'product_cat' ) ) . '">
					' . str_repeat( '-', $depth ) . '
					' . esc_html( $category->name ) . '
					' . $this->getCount( $category, $attributes ) . '
				</option>
				' . ( ! empty( $category->children ) ? $this->renderDropdownOptions( $category->children, $attributes, $uid, $depth + 1 ) : '' ) . '
			';
		}

		return $output;
	}

	/**
	 * Render the category list as a list.
	 *
	 * @param array $categories List of terms.
	 * @param array $attributes Block attributes. Default empty array.
	 * @param int   $uid Unique ID for the rendered block, used for HTML IDs.
	 * @param int   $depth Current depth.
	 * @return string Rendered output.
	 */
	protected function renderList( $categories, $attributes, $uid, $depth = 0 ) {
		$output = '<ul class="wc-block-product-categories-list wc-block-product-categories-list--depth-' . absint( $depth ) . '">' . $this->renderListItems( $categories, $attributes, $uid, $depth ) . '</ul>';

		return $output;
	}

	/**
	 * Render a list of terms.
	 *
	 * @param array $categories List of terms.
	 * @param array $attributes Block attributes. Default empty array.
	 * @param int   $uid Unique ID for the rendered block, used for HTML IDs.
	 * @param int   $depth Current depth.
	 * @return string Rendered output.
	 */
	protected function renderListItems( $categories, $attributes, $uid, $depth = 0 ) {
		$output = '';

		foreach ( $categories as $category ) {
			$output .= '
				<li class="wc-block-product-categories-list-item">
					<a href="' . esc_attr( get_term_link( $category->term_id, 'product_cat' ) ) . '">
						' . esc_html( $category->name ) . '
					</a>
					' . $this->getCount( $category, $attributes ) . '
					' . ( ! empty( $category->children ) ? $this->renderList( $category->children, $attributes, $uid, $depth + 1 ) : '' ) . '
				</li>
			';
		}

		return $output;
	}

	/**
	 * Get the count, if displaying.
	 *
	 * @param object $category Term object.
	 * @param array  $attributes Block attributes. Default empty array.
	 * @return string
	 */
	protected function getCount( $category, $attributes ) {
		if ( empty( $attributes['hasCount'] ) ) {
			return '';
		}
		return $attributes['isDropdown'] ? '(' . absint( $category->count ) . ')' : '<span class="wc-block-product-categories-list-item-count">' . absint( $category->count ) . '</span>';
	}
}
