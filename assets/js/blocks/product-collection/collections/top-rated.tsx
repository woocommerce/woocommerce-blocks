/**
 * External dependencies
 */
import type { BlockAttributes, InnerBlockTemplate } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, starEmpty } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	DEFAULT_ATTRIBUTES,
	INNER_BLOCKS_PRODUCT_TEMPLATE,
} from '../constants';

const collection = {
	name: 'woocommerce-blocks/product-collection/top-rated',
	title: 'Top Rated',
	icon: <Icon icon={ starEmpty } />,
	description: 'Products gaining popularity based on recent activity.',
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
		orderBy: 'rating',
		order: 'desc',
		perPage: 5,
		pages: 1,
	},
	collection: collection.name,
};

const heading: [ string, BlockAttributes?, InnerBlockTemplate[]? ] = [
	'core/heading',
	{
		textAlign: 'center',
		level: 2,
		content: __( 'Top Rated Products', 'woo-gutenberg-products-block' ),
		style: { spacing: { margin: { bottom: '1rem' } } },
	},
];

const innerBlocks: InnerBlockTemplate[] = [
	heading,
	INNER_BLOCKS_PRODUCT_TEMPLATE,
];

export default {
	...collection,
	attributes,
	innerBlocks,
};
