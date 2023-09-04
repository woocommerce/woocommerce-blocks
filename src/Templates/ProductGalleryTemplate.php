<?php
namespace Automattic\WooCommerce\Blocks\Templates;

use Automattic\WooCommerce\Blocks\Utils\BlockTemplateUtils;

/**
 * CartTemplate class.
 *
 * @internal
 */
class ProductGalleryTemplate extends AbstractPageTemplate {

	/**
	 * Initialization method.
	 */
	protected function init() {
		parent::init();
		add_filter( 'query_vars', array( $this, 'add_query_vars' ) );
		add_action( 'template_include', array( $this, 'render_product_gallery_template' ) );
		add_filter( 'get_block_templates', array( $this, 'wrap_modal' ), 10 );
	}
	/**
	 * Template slug.
	 *
	 * @return string
	 */
	public static function get_slug() {
		return 'Product Gallery';
	}

	/**
	 * Should return true on pages/endpoints/routes where the template should be shown.
	 *
	 * @return boolean
	 */
	public function is_active_template() {
		return true;
	}

	/**
	 * Returns the page object assigned to this template/page.
	 */
	public static function get_placeholder_page() {
		return null;
	}

	/**
	 * Check if the product gallery template should be rendered.
	 *
	 * @return bool
	 */
	public function shoud_render_product_gallery_template() {
		global $wp_query;
		if ( is_product() && isset( $wp_query->query_vars['product-id'] ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Render the product gallery template.
	 *
	 * @param string $template Query vars.
	 * @return string
	 */
	public function render_product_gallery_template( $template ) {
		if ( $this->shoud_render_product_gallery_template() ) {
			return locate_block_template( BlockTemplateUtils::get_templates_directory() . '/product-gallery.html', 'product-gallery', array() );
		}

		return $template;

	}

	/**
	 * Wrap the product gallery template in a modal.
	 *
	 * @param array $block_templates Block templates.
	 * @return array
	 */
	public function wrap_modal( $block_templates ) {
		if ( $this->shoud_render_product_gallery_template() && ! empty( $block_templates ) ) {
			$template          = $block_templates[0];
			$template->content = '<dialog data-wc-navigation-id="wc-block-product-gallery-full-view">' . $template->content . '</dialog>';

			return array( $template );
		}

		return $block_templates;

	}

	/**
	 * Add query vars.
	 *
	 * @param array $vars Query vars.
	 * @return array
	 */
	public function add_query_vars( $vars ) {
		$vars[] = 'product-id';
		return $vars;
	}

	/**
	 * Should return the title of the page.
	 *
	 * @return string
	 */
	public static function get_template_title() {
		return __( 'Product Gallery', 'woo-gutenberg-products-block' );
	}
}
