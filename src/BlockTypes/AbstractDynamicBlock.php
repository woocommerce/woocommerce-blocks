<?php
/**
 * Abstract dynamic block class.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * AbstractDynamicBlock class.
 */
abstract class AbstractDynamicBlock {

	/**
	 * Block namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'woocommerce';

	/**
	 * Block namespace.
	 *
	 * @var string
	 */
	protected $block_name = '';

	/**
	 * Registers the block type with WordPress.
	 */
	public function register_block_type() {
		register_block_type(
			$this->namespace . '/' . $this->block_name,
			array(
				'render_callback' => array( $this, 'render' ),
				'editor_script'   => 'wc-' . $this->block_name,
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'attributes'      => $this->get_attributes(),
			)
		);
	}

	/**
	 * Include and render a dynamic block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	abstract public function render( $attributes = array(), $content = '' );

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes() {
		return array();
	}

	/**
	 * Get the schema for the alignment property.
	 *
	 * @return array Property definition for align.
	 */
	protected function get_schema_align() {
		return array(
			'type' => 'string',
			'enum' => array( 'left', 'center', 'right', 'wide', 'full' ),
		);
	}

	/**
	 * Get the schema for a list of IDs.
	 *
	 * @return array Property definition for a list of numeric ids.
	 */
	protected function get_schema_list_ids() {
		return array(
			'type'    => 'array',
			'items'   => array(
				'type' => 'number',
			),
			'default' => array(),
		);
	}

	/**
	 * Get the schema for a boolean value.
	 *
	 * @param  string $default  The default value.
	 * @return array Property definition.
	 */
	protected function get_schema_boolean( $default = true ) {
		return array(
			'type'    => 'boolean',
			'default' => $default,
		);
	}

	/**
	 * Get the schema for a numeric value.
	 *
	 * @param  string $default  The default value.
	 * @return array Property definition.
	 */
	protected function get_schema_number( $default ) {
		return array(
			'type'    => 'number',
			'default' => $default,
		);
	}

	/**
	 * Get the schema for a string value.
	 *
	 * @param  string $default  The default value.
	 * @return array Property definition.
	 */
	protected function get_schema_string( $default = '' ) {
		return array(
			'type'    => 'string',
			'default' => $default,
		);
	}

	/**
	 * Filter and return a template part.
	 *
	 * @param string $name Name of the template part.
	 * @param string $html HTML of the template.
	 * @param array  $placeholders Array of placeholders to find/replace in the filtered HTML.
	 * @param array  $args Contextual data which may be useful for developers hooking in via the filter hooks.
	 * @return string Resulting HTML.
	 */
	protected function render_template_part( $name, $html, $placeholders = array(), $args = array() ) {
		$html = $this->filter_template_part( $name, $html, $placeholders, $args );

		if ( ! empty( $placeholders ) ) {
			$html = $this->replace_placeholders( $html, $placeholders );
		}

		return $html;
	}

	/**
	 * Filter a template part.
	 *
	 * @param string $name Template name. Used in hooks with the format: `woocommerce_blocks_NAME_template_html`.
	 * @param string $html HTML for the template.
	 * @param array  $placeholders Array of placeholders to find/replace in the filtered HTML.
	 * @param array  $args Contextual data which may be useful for developers hooking in via the filter hooks.
	 * @return string
	 */
	protected function filter_template_part( $name, $html, $placeholders, $args ) {
		$filter_args = $args;
		$filter_args = array_unshift( $filter_args, $html );
		$filter_args = array_push( $filter_args, $placeholders );

		/**
		 * Filter the template part.
		 *
		 * @param array $filter_args Contains the HTML for the template, args passed via render_template_part, and any placeholders.
		 * @return string
		 */
		return apply_filters_ref_array( 'woocommerce_blocks_' . $name . '_template_html', $filter_args );
	}

	/**
	 * Replace placeholders in a string.
	 *
	 * @param string $html HTML for the template.
	 * @param array  $placeholders Array of placeholders to find/replace in the resulting HTML.
	 * @return string
	 */
	protected function replace_placeholders( $html, $placeholders ) {
		foreach ( $placeholders as $find => $replace ) {
			$html = str_replace( '{{ ' . $find . ' }}', $replace, $html );
		}

		return $html;
	}
}
