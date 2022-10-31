/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';

let blockAttributes: Record< string, Record< string, unknown > > = {
	productId: {
		type: 'number',
		default: 0,
	},
	isDescendentOfQueryLoop: {
		type: 'boolean',
		default: false,
	},
};

if ( isFeaturePluginBuild() ) {
	blockAttributes = {
		...blockAttributes,
		textAlign: {
			type: 'string',
		},
	};
}
export default blockAttributes;
