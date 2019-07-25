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
	 * Return the prefix for filter and action hooks.
	 *
	 * @param string $hook Hook name to prefix.
	 * @return string Hook name, in the format: NAMESPACE_BLOCK_block_HOOK, lowercase.
	 */
	protected function get_prefixed_hook( $hook ) {
		return implode( '_', array_map( 'strtolower', [ $this->namespace, $this->block_name, 'block', $hook ] ) );
	}

	/**
	 * Get template HTML from a template file.
	 *
	 * @param string $template_name Name of the template file. Used in filters.
	 * @param string $template_path Path to template file.
	 * @param array  $template_args array of args to extract and pass to the template file.
	 * @return string The HTML from the file.
	 */
	protected function get_template_html( $template_name, $template_path, $template_args ) {
		$template_path = apply_filters( $this->get_prefixed_hook( 'template_path' ), $template_path, $template_name, $this );
		$template_args = apply_filters( $this->get_prefixed_hook( 'template_args' ), $template_args, $template_name, $this );
		$template_html = '';

		if ( file_exists( $template_path ) ) {
			ob_start();
			extract( $template_args, EXTR_SKIP ); // phpcs:ignore
			include $template_path;
			$template_html = ob_get_clean();
		}

		/**
		 * Filter the rendered template part.
		 *
		 * @param string $template_html HTML that was generated from the template.
		 * @param string $template_name Name of the template part.
		 * @param string $template_path Path to template file.
		 * @param array  $template_args Args that will be passed to the template file.
		 * @param object $this The block class.
		 * @return string
		 */
		return apply_filters( $this->get_prefixed_hook( 'template_html' ), $template_html, $template_name, $template_path, $template_args, $this );
	}

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
}
