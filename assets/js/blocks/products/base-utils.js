/**
 * External dependencies
 */
import { getRegisteredInnerBlocks } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import {
	ProductListTitle,
	ProductListPrice,
	ProductListButton,
	ProductListImage,
	ProductListRating,
	ProductListSummary,
	ProductListSaleBadge,
} from '../../atomic/components/product-list';

// @todo how to support these using mapping?
//'core/paragraph',
//'core/heading',
/**
 * Map blocks names to components.
 *
 * @param {string} blockName Name of the parent block. Used to get extension children.
 */
export const getBlockMap = ( blockName ) => ( {
	'woocommerce/product-list-price': ProductListPrice,
	'woocommerce/product-list-image': ProductListImage,
	'woocommerce/product-list-title': ProductListTitle,
	'woocommerce/product-list-rating': ProductListRating,
	'woocommerce/product-list-button': ProductListButton,
	'woocommerce/product-list-summary': ProductListSummary,
	'woocommerce/product-list-sale-badge': ProductListSaleBadge,
	...getRegisteredInnerBlocks( blockName ),
} );

/**
 * Maps component names to component classes and block names.
 *
 * @param {string} blockName Name of the parent block. Used to get extension children.
 * @param {object[]} blockMap Map of blocks as returned by `getBlockMap`. If not specified, it gets the block map with the passed `blockName`.
 */
export const getReversedBlockMap = (
	blockName,
	blockMap = getBlockMap( blockName )
) =>
	Object.entries( blockMap ).reduce( ( acc, block ) => {
		acc[ block[ 1 ].name ] = {
			component: block[ 1 ],
			key: block[ 0 ],
		};
		return acc;
	}, {} );

/**
 * The default layout built from the default template.
 */
export const DEFAULT_PRODUCT_LIST_LAYOUT = [
	{
		component: 'ProductListSaleBadge',
		props: { align: 'left' },
	},
	{
		component: 'ProductListImage',
		props: {},
	},
	{
		component: 'ProductListTitle',
		props: {},
	},
	{
		component: 'ProductListPrice',
		props: {},
	},
	{
		component: 'ProductListRating',
		props: {},
	},
	{
		component: 'ProductListButton',
		props: {},
	},
];

/**
 * Converts and maps a layoutConfig to a block template.
 */
export const layoutConfigToBlockTemplate = (
	reversedBlockMap,
	layoutConfig
) => {
	return layoutConfig
		.map( ( layout ) => {
			const block = reversedBlockMap[ layout.component ];

			return block.key ? [ block.key, layout.props ] : null;
		} )
		.filter( Boolean );
};

/**
 * The default template (list of inner blocks) for the product list.
 */
export const getDefaultBlocks = ( reversedBlockMap ) =>
	layoutConfigToBlockTemplate(
		reversedBlockMap,
		DEFAULT_PRODUCT_LIST_LAYOUT
	);

/**
 * Converts innerblocks to a list of layout configs.
 *
 * @param {object} blockMap Map of blocks as returned by `getBlockMap`.
 * @param {object[]} innerBlocks Inner block components.
 */
export const getProductLayoutConfig = ( blockMap, innerBlocks ) => {
	if ( ! innerBlocks || innerBlocks.length === 0 ) {
		return null;
	}

	return innerBlocks
		.map( ( block ) => {
			if ( ! blockMap[ block.name ] || ! blockMap[ block.name ].name ) {
				return null;
			}
			return {
				component: blockMap[ block.name ].name,
				props: {
					...block.attributes,
					product: undefined,
					children:
						block.innerBlocks.length > 0
							? getProductLayoutConfig(
									blockMap,
									block.innerBlocks
							  )
							: [],
				},
			};
		} )
		.filter( Boolean );
};
