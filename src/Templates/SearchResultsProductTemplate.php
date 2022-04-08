<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * ProductSearchTemplate class.
 *
 * @internal
 */
class SearchResultsProductTemplate {

	const SLUG        = 'search-results-product';
	const TITLE       = 'Search Results Product';
	const DESCRIPTION = 'Template used to display search results for products';

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_filter( 'search_template_hierarchy', array( $this, 'update_search_template_hierarchy' ), 10, 3 );
		add_filter( 'get_block_templates', array( $this, 'set_template_info' ) );
	}

	/**
	 * When the search is for products and it used a block theme the Product Search Template is rendered.
	 *
	 * @param array $templates Templates that match the search hierarchy.
	 */
	public function update_search_template_hierarchy( $templates ) {
		if ( ( is_search() && is_post_type_archive( 'product' ) ) && wp_is_block_theme() ) {
			return [ self::SLUG ];
		}
		return $templates;
	}

	/**
	 * Update Product Search Template info.
	 *
	 * @param array $templates List of templates.
	 */
	public function set_template_info( $templates ) {
		return array_map(
			function ( $template ) {
				if ( self::SLUG !== $template->slug ) {
					return $template;
				}

				$template->title       = self::TITLE;
				$template->description = self::DESCRIPTION;

				return $template;
			},
			$templates
		);
	}
}
