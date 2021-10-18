<?php
namespace Automattic\WooCommerce\Blocks;

final class BlockTemplateController {
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
		// Check if the current template is a block template.

		add_action( 'init', array($this, 'create_template') );
	}

	/**
	 * Automatically create template for product post types which uses the legacy-single-product block.
	 */
	public function create_template() {
		add_filter('get_block_templates', function(  $query_result, $query, $template_type ) {
//			file_put_contents("query.txt", json_encode($query));
//			file_put_contents("query_result.txt", json_encode($query_result));
			if ( ! $query ) {
				$query_result[] = (object) array(
					"type" => "wp_template",
					"theme" => "theme-experiments/tt1-blocks",
					"slug" => "archive-product",
					"id" => "theme-experiments/tt1-blocks//archive-product",
					"title" => "Archive Product",
					"content" => '<!-- wp:template-part {"slug":"header" "tagName": "header"} /--><!-- wp:woocommerce/legacy-archive-product /--><!-- wp:template-part {"slug":"footer","className":"site-footer-container"} /-->',
					"description" => "Template used to display a product archive",
					"source" => "woocommerce-gutenberg-products-block",
					"wp_id" => null,
					"status" => "publish",
					"has_theme_file" => false
				);
			}
			return $query_result;
		}, 10, 3);
	}
}
