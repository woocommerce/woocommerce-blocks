/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';

interface BlockAttributes {
	productId: {
		type: string;
		default: number;
	};
	isDescendentOfQueryLoop: {
		type: string;
		default: boolean;
	};
	textAlign?: {
		type: string;
	};
}

let blockAttributes: BlockAttributes = {
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
