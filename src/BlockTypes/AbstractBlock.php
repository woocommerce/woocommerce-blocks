<?php
/**
 * Abstract block class.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * AbstractBlock class.
 */
abstract class AbstractBlock {

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
	 * Constructor
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
	}

	/**
	 * Registers the block type with WordPress.
	 */
	public function register_block_type() {
		register_block_type(
			$this->namespace . '/' . $this->block_name,
			array(
				'editor_script' => 'wc-' . $this->block_name,
				'editor_style'  => 'wc-block-editor',
				'style'         => 'wc-block-style',
			)
		);
	}

	/**
	 * Will enqueue any editor assets a block needs to load
	 */
	public function enqueue_editor_assets() {
		// noop, expected that children will override if needed.
	}
}
