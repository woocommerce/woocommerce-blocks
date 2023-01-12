<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * BlockTemplatesCompatibility class.
 *
 * To bridge the gap on compatibility with PHP hooks and blockified templates.
 *
 * @internal
 */
class BlockTemplatesCompatibility {

	const LOOP_ITEM_ID = 'product-loop-item';

	/**
	 * Hoding the supported hooks, their positions and the hooked functions.
	 *
	 * @var array $hook_data
	 */
	protected $hook_data = array(
		'core/query'            => array(
			'woocommerce_before_main_content' => array(
				'position' => 'before',
				'hooked'   => array(
					'woocommerce_output_content_wrapper' => 10,
					'woocommerce_breadcrumb'             => 20,
				),
			),
			'woocommerce_after_main_content'  => array(
				'position' => 'after',
				'hooked'   => array(
					'woocommerce_output_content_wrapper_end' => 10,
				),
			),
		),
		'core/post-title'       => array(
			'woocommerce_before_shop_loop_item_title' => array(
				'position' => 'before',
				'hooked'   => array(
					'woocommerce_show_product_loop_sale_flash' => 10,
					'woocommerce_template_loop_product_thumbnail' => 10,
				),
			),
			'woocommerce_shop_loop_item_title'        => array(
				'position' => 'after',
				'hooked'   => array(
					'woocommerce_template_loop_product_title' => 10,
				),
			),
			'woocommerce_after_shop_loop_item_title'  => array(
				'position' => 'after',
				'hooked'   => array(
					'woocommerce_template_loop_rating' => 5,
					'woocommerce_template_loop_price'  => 10,
				),
			),
		),
		self::LOOP_ITEM_ID      => array(
			'woocommerce_before_shop_loop_item' => array(
				'position' => 'before',
				'hooked'   => array(
					'woocommerce_template_loop_product_link_open' => 10,
				),
			),
			'woocommerce_after_shop_loop_item'  => array(
				'position' => 'after',
				'hooked'   => array(
					'woocommerce_template_loop_product_link_close' => 5,
					'woocommerce_template_loop_add_to_cart' => 10,
				),
			),
		),
		'core/post-template'    => array(
			'woocommerce_before_shop_loop' => array(
				'position' => 'before',
				'hooked'   => array(
					'woocommerce_output_all_notices' => 10,
					'woocommerce_result_count'       => 20,
					'woocommerce_catalog_ordering'   => 30,
				),
			),
			'woocommerce_after_shop_loop'  => array(
				'position' => 'after',
				'hooked'   => array(
					'woocommerce_pagination' => 10,
				),
			),
		),
		'core/query-no-results' => array(
			'woocommerce_no_products_found' => array(
				'position' => 'before',
				'hooked'   => array(
					'wc_no_products_found' => 10,
				),
			),
		),
	);

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
		if ( ! wc_current_theme_is_fse_theme() ) {
			return;
		}

		/**
		 * We're only support Archive Template for now. In the future, we'll
		 * support other templates as well.
		 */
		if ( ! is_shop() && ! is_product_taxonomy() ) {
			return;
		}

		add_filter( 'render_block_data', array( $this, 'update_render_block_data' ), 10, 3 );
		add_filter( 'render_block', array( $this, 'inject_hooks' ), 10, 2 );
		add_action( 'after_setup_theme', array( $this, 'remove_default_hooks' ) );
	}

	/**
	 * Remove the default callback added by WooCommerce. We replaced these
	 * callbacks by blocks so we have to remove them to prevent duplicated
	 * content.
	 */
	public function remove_default_hooks() {
		$hooks = array_merge( ...array_values( $this->hook_data ) );
		foreach ( $hooks as $hook => $data ) {
			if ( ! isset( $data['hooked'] ) ) {
				continue;
			}
			foreach ( $data['hooked'] as $callback => $priority ) {
				remove_action( $hook, $callback, $priority );
			}
		}
	}

	/**
	 * Update the render block data to inject our custom attribute needed to
	 * determine which blocks belong to an inherited Products block.
	 *
	 * @param array         $parsed_block The block being rendered.
	 * @param array         $source_block An un-modified copy of $parsed_block, as it appeared in the source content.
	 * @param WP_Block|null $parent_block If this is a nested block, a reference to the parent block.
	 *
	 * @return array
	 */
	public function update_render_block_data( $parsed_block, $source_block, $parent_block ) {
		/**
		 * Custom data can be injected to top level block only, as Gutenberg
		 * will use this data to render the blocks and its nested blocks.
		 */
		if ( $parent_block ) {
			return $parsed_block;
		}

		array_walk( $parsed_block['innerBlocks'], array( $this, 'inner_blocks_walker' ) );

		return $parsed_block;
	}

	/**
	 * Inject hooks to rendered content of corresponding blocks.
	 *
	 * @param mixed $block_content The rendered block content.
	 * @param mixed $block         The parsed block data.
	 * @return string
	 */
	public function inject_hooks( $block_content, $block ) {
		/**
		 * If the block is not inherited, we don't need to inject hooks.
		 */
		if ( empty( $block['attrs']['isInherited'] ) ) {
			return $block_content;
		}

		$block_name = $block['blockName'];

		/**
		 * The core/post-template has two different block names:
		 * - core/post-template when the wrapper is rendered.
		 * - core/null when the loop item is rendered.
		 */
		if (
			'core/null' === $block_name &&
			isset( $block['attrs']['__woocommerceNamespace'] ) &&
			'woocommerce/product-query/product-template' === $block['attrs']['__woocommerceNamespace']
		) {
			$block_name = self::LOOP_ITEM_ID;
		}

		if ( ! in_array( $block_name, array_keys( $this->hook_data ), true ) ) {
			return $block_content;
		}

		$hooks = $this->hook_data[ $block_name ];

		return sprintf(
			'%1$s%2$s%3$s',
			$this->get_hooks_buffer( $hooks, 'before' ),
			$block_content,
			$this->get_hooks_buffer( $hooks, 'after' )
		);
	}

	/**
	 * Get the buffer content of the hooks to append/prepend to render content.
	 *
	 * @param array  $hooks    The hooks to be rendered.
	 * @param string $position The position of the hooks.
	 *
	 * @return string
	 */
	protected function get_hooks_buffer( $hooks, $position ) {
		ob_start();
		foreach ( array_keys( $hooks ) as $hook ) {
			if ( $hooks[ $hook ]['position'] === $position ) {
				do_action( $hook );
			}
		}
		return ob_get_clean();
	}

	/**
	 * Loop through inner blocks recursively to find the Products blocks that
	 * inherits query from template.
	 *
	 * @param array $block Parsed block data.
	 */
	protected function inner_blocks_walker( &$block ) {
		if (
			'core/query' === $block['blockName'] &&
			isset( $block['attrs']['namespace'] ) &&
			'woocommerce/product-query' === $block['attrs']['namespace'] &&
			isset( $block['attrs']['query']['inherit'] ) &&
			$block['attrs']['query']['inherit']
		) {
			$block['attrs']['isInherited'] = 1;
			array_walk( $block['innerBlocks'], array( $this, 'inject_attribute' ) );
		}

		if ( ! empty( $block['innerBlocks'] ) ) {
			array_walk( $block['innerBlocks'], array( $this, 'inner_blocks_walker' ) );
		}
	}

	/**
	 * Recursively inject the custom attribute to all nested blocks.
	 *
	 * @param array $block Parsed block data.
	 */
	protected function inject_attribute( &$block ) {
		$block['attrs']['isInherited'] = 1;

		if ( ! empty( $block['innerBlocks'] ) ) {
			array_walk( $block['innerBlocks'], array( $this, 'inject_attribute' ) );
		}
	}

}
