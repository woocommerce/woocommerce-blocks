<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * AbstractInnerBlock class.
 */
abstract class AbstractInnerBlock extends AbstractBlock {
	/**
	 * Registers the block type with WordPress using the metadata file.
	 *
	 * @return string[] Chunks paths.
	 */
	protected function register_block_type() {
		$block_settings = [
			'render_callback' => $this->get_block_type_render_callback(),
			'editor_style'    => $this->get_block_type_editor_style(),
			'style'           => $this->get_block_type_style(),
		];

		if ( isset( $this->api_version ) && '2' === $this->api_version ) {
			$block_settings['api_version'] = 2;
		}

		$metadata_path = $this->asset_api->get_block_metadata_path( $this->block_name );
		// Prefer to register with metadata if the path is set in the block's class.
		register_block_type_from_metadata(
			$metadata_path,
			$block_settings
		);
	}
}
