<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Blocks\Templates\SingleProductTemplateCompatibility;


/**
 * SingleProductTemplateController class.
 *
 * @internal
 */
class SingleProductTemplateController extends BlockTemplatesRefactorController {

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

}
