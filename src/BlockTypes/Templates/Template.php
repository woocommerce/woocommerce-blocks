<?php
/**
 * Template class which renders template files whilst running them through filters.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes\Templates;

defined( 'ABSPATH' ) || exit;

/**
 * Template class.
 */
class Template {

	/**
	 * Template name.
	 *
	 * @var string
	 */
	protected $name = '';

	/**
	 * Content visibility.
	 *
	 * @var array
	 */
	protected $visibility = array();

	/**
	 * Args to pass through to the template file.
	 *
	 * @var array
	 */
	protected $template_args = array();

	/**
	 * Context for the template passed through to hooks.
	 *
	 * @var array
	 */
	protected $context = array();

	/**
	 * Constructor.
	 *
	 * @param string $name Template name.
	 */
	public function __construct( $name ) {
		$this->name = $name;
	}

	/**
	 * Set content visibility.
	 *
	 * @param array $visibility Name/value pairs which define what content is visible.
	 */
	public function set_visibility( $visibility = array() ) {
		$this->visibility = (array) $visibility;
	}

	/**
	 * Set template args.
	 *
	 * @param array $template_args Name/value pairs of args to pass to template files.
	 */
	public function set_template_args( $template_args = array() ) {
		$this->template_args = (array) $template_args;
	}

	/**
	 * Set context to pass to action and filter hooks.
	 */
	public function set_context() {
		$this->context = (array) func_get_args();
	}

	/**
	 * Is content visible?
	 *
	 * @param string $name Name of content to check.
	 * @return boolean
	 */
	public function is_visible( $name ) {
		return ! isset( $this->visibility[ $name ] ) || false !== $this->visibility[ $name ];
	}

	/**
	 * Filter and return a template part.
	 *
	 * @return string Rendered HTML.
	 */
	public function render() {
		/**
		 * Filter the args that will be passed to a template.
		 *
		 * @param string $template_args Args that will be passed to the template file.
		 * @param mixed  $context Contextual data about the template e.g. the block class calling it.
		 * @return string
		 */
		$template_args = apply_filters_ref_array(
			$this->get_hook_prefix() . '_template_args',
			$this->prepare_ref_array( $this->template_args, $this->context )
		);

		/**
		 * Filter the template file to be used.
		 *
		 * @param string $template_path Path to template file.
		 * @param mixed  $context Contextual data about the template e.g. the block class calling it.
		 * @return string
		 */
		$template_path = apply_filters_ref_array(
			$this->get_hook_prefix() . '_template_path',
			$this->prepare_ref_array( __DIR__ . '/' . $this->name . '.html.php', $this->context )
		);

		/**
		 * Filter the rendered template file HTML.
		 *
		 * @param string $template_html HTML that was generated from the template.
		 * @param array  $template_args Args that will be passed to the template file.
		 * @param mixed  $context Contextual data about the template e.g. the block class calling it.
		 * @return string
		 */
		return apply_filters_ref_array(
			$this->get_hook_prefix() . '_template_html',
			$this->prepare_ref_array(
				$this->get_template_html( $template_path, $template_args ),
				$template_args,
				$this->context
			)
		);
	}

	/**
	 * Return the prefix for filter and action hooks.
	 *
	 * @return string
	 */
	protected function get_hook_prefix() {
		return 'woocommerce_blocks_' . sanitize_key( str_replace( '-', '_', $this->name ) );
	}

	/**
	 * Prepare data to pass to apply_filters_ref_array.
	 *
	 * Data being filtered should always be defined first.
	 * The final param will be the array of data to pass to filter. Each array item will be passed as a single variable to the filter, not as an array.
	 *
	 * @return array Combined data and args.
	 */
	protected function prepare_ref_array() {
		$func_args       = func_get_args();
		$value_to_filter = array_shift( $func_args );
		$filter_args     = array_pop( $func_args );
		$ref_array       = array();

		if ( ! empty( $func_args ) ) {
			foreach ( $func_args as $func_arg ) {
				array_unshift( $ref_array, $func_arg );
			}
		}

		array_unshift( $ref_array, $value_to_filter );

		return $ref_array;
	}

	/**
	 * Get template HTML from file.
	 *
	 * @param string $file Path to template file.
	 * @param array  $args array of args to pass to template file.
	 * @return string The HTML from the file.
	 */
	protected function get_template_html( $file, $args ) {
		if ( file_exists( $file ) ) {
			ob_start();
			$template = $this;
			extract( $args, EXTR_SKIP ); // phpcs:ignore
			include $file;
			return ob_get_clean();
		}
		return '';
	}
}
