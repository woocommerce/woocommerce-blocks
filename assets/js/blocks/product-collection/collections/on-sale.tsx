/**
 * External dependencies
 */
import { InnerBlockTemplate } from '@wordpress/blocks';
import { Icon, percent } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	DEFAULT_ATTRIBUTES,
	INNER_BLOCKS_PRODUCT_TEMPLATE,
} from '../constants';

const collection = {
	name: 'woocommerce-blocks/product-collection/on-sale',
	title: 'On Sale',
	icon: <Icon icon={ percent } />,
	description: 'Products currently marked on sale.',
	keywords: [],
	scope: [],
};

const attributes = {
	...DEFAULT_ATTRIBUTES,
	displayLayout: {
		type: 'flex',
		columns: 5,
	},
	query: {
		...DEFAULT_ATTRIBUTES.query,
		inherit: false,
		woocommerceOnSale: true,
		perPage: 5,
		pages: 1,
	},
	collection: collection.name,
};

const innerBlocks: InnerBlockTemplate[] = [ INNER_BLOCKS_PRODUCT_TEMPLATE ];

export default {
	...collection,
	attributes,
	innerBlocks,
};
