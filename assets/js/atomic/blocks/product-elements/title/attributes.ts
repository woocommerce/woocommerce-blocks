/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { isFeaturePluginBuild } from '~/settings/blocks';

let blockAttributes: BlockAttributes = {
	headingLevel: {
		type: 'number',
		default: 2,
	},
	showProductLink: {
		type: 'boolean',
		default: true,
	},
	linkTarget: {
		type: 'string',
	},
	productId: {
		type: 'number',
		default: 0,
	},
};

if ( isFeaturePluginBuild() ) {
	blockAttributes = {
		...blockAttributes,
		align: {
			type: 'string',
		},
	};
}
export default blockAttributes;
