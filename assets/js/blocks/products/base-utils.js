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
 * The default layout built from the default template.
 */
export const DEFAULT_PRODUCT_LIST_LAYOUT = [
	[ 'woocommerce/product-list-sale-badge', { align: 'left' } ],
	[ 'woocommerce/product-list-image' ],
	[ 'woocommerce/product-list-title' ],
	[ 'woocommerce/product-list-price' ],
	[ 'woocommerce/product-list-rating' ],
	[ 'woocommerce/product-list-button' ],
];

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

	return innerBlocks.map( ( block ) => {
		return [
			block.name,
			{
				...block.attributes,
				product: undefined,
				children:
					block.innerBlocks.length > 0
						? getProductLayoutConfig( blockMap, block.innerBlocks )
						: [],
			},
		];
	} );
};
