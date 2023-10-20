<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Domain\Package;
use Automattic\WooCommerce\Blocks\Templates\SingleProductTemplateCompatibility;


/**
 * SingleProductTemplateController class.
 *
 * @internal
 */
class SingleProductTemplateController extends BlockTemplatesRefactorController {
	/**
	 * Template Title.
	 *
	 * @var string
	 */
	private $template_title;


	/**
	 * Template Description.
	 *
	 * @var string
	 */
	private $template_description;

	/**
	 * Constructor.
	 *
	 * @param Package $package An instance of Package.
	 */
	public function __construct( Package $package ) {
		parent::__construct( $package );
		$this->template_title       = _x( 'Single Product', 'Template name', 'woo-gutenberg-products-block' );
		$this->template_description = __( 'Displays a single product.', 'woo-gutenberg-products-block' );

	}

	/**
	 * Renders the template.
	 *
	 * @param WP_Template         $template_to_render The template to render.
	 * @param WP_Block_Template[] $all_templates An array of templates to render that matches the query.
	 *
	 * @return WP_Block_Template[] An array of found templates.
	 */
	public function render_template( $template_to_render, $all_templates ) {
		if ( is_singular( 'product' ) ) {
			$update_content              = SingleProductTemplateCompatibility::add_compatibility_layer( $template_to_render->content );
			$template_to_render->content = $update_content;
			return $template_to_render;
		}
		return $all_templates;
	}


	/**
	 * Update template data for the REST API. This is necessary for the Site Editor to update a specific template.
	 *
	 * @param WP_Block_Template $template template.
	 *
	 * @return WP_Block_Template|null
	 */
	public function update_template_data_rest_api( $template ) {
		$template->title       = 'ciao';
		$template->description = $this->template_description;
		return $template;
	}

}
