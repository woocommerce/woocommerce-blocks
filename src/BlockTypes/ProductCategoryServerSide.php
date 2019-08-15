<?php
/**
 * Product category SSR block.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\BlockTypes;

defined( 'ABSPATH' ) || exit;

/**
 * ProductCategory class.
 */
class ProductCategoryServerSide extends AbstractProductGrid {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-category-server-side';

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {}

	/**
	 * Registers the block type
	 *
	 * @return void
	 */
	public function register_block_type() {
		register_block_type(
			$this->namespace . '/' . $this->block_name,
			array(
				'render_callback' => array( $this, 'render' ),
				'editor_script'   => 'wc-' . $this->block_name,
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'script'          => 'wc-product-category-server-side-frontend',
				'attributes'      => $this->get_attributes(),
			)
		);
	}


	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes() {
		return array_merge(
			parent::get_attributes(),
			array(
				'className' => $this->get_schema_string(),
				'orderby'   => $this->get_schema_orderby(),
				'editMode'  => $this->get_schema_boolean( true ),
			)
		);
	}

	/**
	 * Get the data attributes for the rendered element.
	 *
	 * @param array $attributes  The attributes containing the data to embed.
	 * @return string
	 */
	protected function get_data( $attributes ) {
		return implode(
			' ',
			array(
				"data-wc-blockattributes='" . wp_json_encode( $attributes ) . "'",
				"data-block-name='" . $this->namespace . '/' . $this->block_name . "'",
			)
		);
	}

	/**
	 * Render function for block
	 *
	 * @param array  $attributes  Attributes for block.
	 * @param string $content    Content for block.
	 * @return string
	 */
	public function render( $attributes = array(), $content = '' ) {
		\Automattic\WooCommerce\Blocks\Assets::register_frontend_script(
			'wc-product-category-server-side-frontend',
			'build/product-category-server-side-frontend.js',
			array( 'wc-vendors', 'wc-blocks' )
		);
		wp_enqueue_script( 'wc-product-category-server-side-frontend' );
		$this->attributes = $this->parse_attributes( $attributes );
		$this->content    = $content;
		$this->query_args = $this->parse_query_args();
		$products         = $this->get_products();
		$classes          = $this->get_container_classes() . ' wc-ssr-block';
		$data             = $this->get_data( $attributes );
		$output           = implode( '', array_map( array( $this, 'render_product' ), $products ) );

		return sprintf( '<div class="%s" %s><ul class="wc-block-grid__products">%s</ul></div>', esc_attr( $classes ), $data, $output );
	}
}
