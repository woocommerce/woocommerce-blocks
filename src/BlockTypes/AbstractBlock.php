<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\WooCommerce\Blocks\Assets\Api as AssetApi;
use Automattic\WooCommerce\Blocks\Integrations\IntegrationRegistry;

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
	 * Block name within this namespace.
	 *
	 * @var string
	 */
	protected $block_name = '';

	/**
	 * Tracks if assets have been enqueued.
	 *
	 * @var boolean
	 */
	protected $enqueued_assets = false;

	/**
	 * Instance of the asset API.
	 *
	 * @var AssetApi
	 */
	protected $asset_api;

	/**
	 * Instance of the asset data registry.
	 *
	 * @var AssetDataRegistry
	 */
	protected $asset_data_registry;

	/**
	 * Instance of the integration registry.
	 *
	 * @var IntegrationRegistry
	 */
	protected $integration_registry;

	/**
	 * Constructor.
	 *
	 * @param AssetApi            $asset_api Instance of the asset API.
	 * @param AssetDataRegistry   $asset_data_registry Instance of the asset data registry.
	 * @param IntegrationRegistry $integration_registry Instance of the integration registry.
	 * @param string              $block_name Optionally set block name during construct.
	 */
	public function __construct( AssetApi $asset_api, AssetDataRegistry $asset_data_registry, IntegrationRegistry $integration_registry, $block_name = '' ) {
		$this->asset_api            = $asset_api;
		$this->asset_data_registry  = $asset_data_registry;
		$this->integration_registry = $integration_registry;
		$this->block_name           = $block_name ? $block_name : $this->block_name;
		$this->initialize();
	}

	/**
	 * Initialize this block type.
	 *
	 * - Hook into WP lifecycle.
	 * - Register the block with WordPress.
	 */
	public function initialize() {
		if ( empty( $this->block_name ) ) {
			_doing_it_wrong( __METHOD__, esc_html( __( 'Block name is required.', 'woo-gutenberg-products-block' ) ), '4.5.0' );
			return false;
		}
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
		$this->integration_registry->initialize( $this->block_name );
		$this->register_block_type();
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
				'supports'      => [],
			)
		);
	}

	/**
	 * Append frontend scripts when rendering the block.
	 *
	 * @param array|\WP_Block $attributes Block attributes, or an instance of a WP_Block. Defaults to an empty array.
	 * @param string          $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public function render( $attributes = [], $content = '' ) {
		$this->enqueue_assets( is_a( $attributes, '\WP_Block' ) ? $attributes->attributes : $attributes );
		return $content;
	}

	/**
	 * Enqueue assets used for rendering the block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 */
	public function enqueue_assets( array $attributes = [] ) {
		if ( $this->enqueued_assets ) {
			return;
		}
		$this->enqueue_data( $attributes );
		$this->enqueue_scripts( $attributes );
		$this->enqueued_assets = true;
	}

	/**
	 * Enqueue assets used for rendering the block in editor context.
	 *
	 * This is needed if a block is not yet within the post content--`render` and `enqueue_assets` may not have ran.
	 */
	public function enqueue_editor_assets() {
		if ( $this->enqueued_assets ) {
			return;
		}
		$this->enqueue_data();
	}

	/**
	 * Injects block attributes into the block.
	 *
	 * @param string $content HTML content to inject into.
	 * @param array  $attributes Key value pairs of attributes.
	 * @return string Rendered block with data attributes.
	 */
	protected function inject_html_data_attributes( $content, array $attributes ) {
		return preg_replace( '/<div /', '<div ' . $this->get_html_data_attributes( $attributes ) . ' ', $content, 1 );
	}

	/**
	 * Converts block attributes to HTML data attributes.
	 *
	 * @param array $attributes Key value pairs of attributes.
	 * @return string Rendered HTML attributes.
	 */
	protected function get_html_data_attributes( array $attributes ) {
		$data = [];

		foreach ( $attributes as $key => $value ) {
			if ( is_bool( $value ) ) {
				$value = $value ? 'true' : 'false';
			}
			if ( ! is_scalar( $value ) ) {
				$value = wp_json_encode( $value );
			}
			$data[] = 'data-' . esc_attr( strtolower( preg_replace( '/(?<!\ )[A-Z]/', '-$0', $key ) ) ) . '="' . esc_attr( $value ) . '"';
		}

		return implode( ' ', $data );
	}

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_data( array $attributes = [] ) {
		$registered_script_data = $this->integration_registry->get_all_registered_script_data();

		foreach ( $registered_script_data as $asset_data_key => $asset_data_value ) {
			if ( ! $this->asset_data_registry->exists( $asset_data_key ) ) {
				$this->asset_data_registry->add( $asset_data_key, $asset_data_value );
			}
		}
	}

	/**
	 * Register/enqueue scripts used for this block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 */
	protected function enqueue_scripts( array $attributes = [] ) {
		// noop. Child classes should override this if needed.
	}

	/**
	 * Script to append the correct sizing class to a block skeleton.
	 *
	 * @return string
	 */
	protected function get_skeleton_inline_script() {
		return "<script>
			var containers = document.querySelectorAll( 'div.wc-block-skeleton' );

			if ( containers.length ) {
				Array.prototype.forEach.call( containers, function( el, i ) {
					var w = el.offsetWidth;
					var classname = '';

					if ( w > 700 )
						classname = 'is-large';
					else if ( w > 520 )
						classname = 'is-medium';
					else if ( w > 400 )
						classname = 'is-small';
					else
						classname = 'is-mobile';

					if ( ! el.classList.contains( classname ) )  {
						el.classList.add( classname );
					}

					el.classList.remove( 'hidden' );
				} );
			}
		</script>";
	}
}
