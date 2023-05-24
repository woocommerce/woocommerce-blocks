/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { isExperimentalBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icon from './icon';
import './variations';
import { getDefaultStockStatuses } from './inspector-controls/utils';

if ( isExperimentalBuild() ) {
	registerBlockType( metadata, {
		icon,
		attributes: {
			...metadata.attributes,
			query: {
				...metadata.attributes.query,
				default: {
					...metadata.attributes.query.default,
					woocommerceStockStatus: getDefaultStockStatuses(),
				},
			},
		},
		edit,
		save,
	} );
}
