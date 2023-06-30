/**
 * External dependencies
 */
import { Icon, image } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { isExperimentalBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import { Edit } from './edit';
import { Save } from './save';
import metadata from './block.json';

if ( isExperimentalBuild() ) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore -- TypeScript expects some required properties which we already
	// registered in PHP.
	registerBlockType( 'woocommerce/product-gallery-thumbnails', {
		edit: Edit,
		save: Save,
	} );
}
