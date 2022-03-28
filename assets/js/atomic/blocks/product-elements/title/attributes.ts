/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';

let blockAttributes: Record< string, Record< string, unknown > > = {
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
		default: '_self',
	},
	rel: {
		type: 'string',
		default: '',
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
