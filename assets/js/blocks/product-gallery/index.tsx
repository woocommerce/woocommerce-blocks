/**
 * External dependencies
 */
import { gallery as icon } from '@wordpress/icons';
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';
import metadata from './block.json';
import './inner-blocks/product-gallery-large-image';
// import './style.scss';

registerBlockSingleProductTemplate( {
	blockName: metadata.name,
	// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core
	blockMetadata: metadata,
	blockSettings: {
		icon,
		// @ts-expect-error `edit` can be extended to include other attributes
		edit: Edit,
		save: Save,
		ancestor: [ 'woocommerce/single-product' ],
	},
} );
