/**
 * External dependencies
 */
import { InnerBlockTemplate } from '@wordpress/blocks';
import { Icon, chartBar } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	DEFAULT_ATTRIBUTES,
	INNER_BLOCKS_PRODUCT_TEMPLATE,
} from '../constants';

const collection = {
	name: 'woocommerce-blocks/product-collection/best-sellers',
	title: 'Best Sellers',
	icon: <Icon icon={ chartBar } />,
	description: 'Display a grid of the best selling products.',
	keywords: [ 'best selling' ],
	scope: [],
};

const attributes = {
	...DEFAULT_ATTRIBUTES,
	displayLayout: {
		type: 'flex',
		columns: 3,
	},
	query: {
		...DEFAULT_ATTRIBUTES.query,
		inherit: false,
		orderBy: 'popularity',
		order: 'desc',
		perPage: 9,
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
