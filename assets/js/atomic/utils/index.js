import {
	ProductListLink,
	ProductListTitle,
	ProductListPrice,
	ProductListButton,
	ProductListImage,
	ProductListRating,
} from '../components/product-list';

/**
 * List of mapped components.
 */
const ATOMIC_COMPONENT_MAP = {
	ProductListLink,
	ProductListTitle,
	ProductListPrice,
	ProductListButton,
	ProductListImage,
	ProductListRating,
};

/**
 * Map blocks names to component names.
 */
const ATOMIC_BLOCK_MAP = {
	'woocommerce/product-list-link': 'ProductListLink',
	'woocommerce/product-list-image': 'ProductListImage',
	'woocommerce/product-list-price': 'ProductListPrice',
	'woocommerce/product-list-title': 'ProductListTitle',
	'woocommerce/product-list-rating': 'ProductListRating',
	'woocommerce/product-list-button': 'ProductListButton',
};

/**
 * List of allowed blocks in the product list. Includes those in the block map abpve.
 */
export const PRODUCT_LIST_ALLOWED_BLOCKS = [
	...Object.keys( ATOMIC_BLOCK_MAP ),
	'core/paragraph',
	'core/heading',
];

/**
 * The default template (list of inner blocks) for the product list.
 */
export const DEFAULT_PRODUCT_LIST_TEMPLATE = [
	[ 'woocommerce/product-list-link', {} ],
	[ 'woocommerce/product-list-price', {} ],
	[ 'woocommerce/product-list-rating', {} ],
	[ 'woocommerce/product-list-button', {} ],
];

export const DEFAULT_PRODUCT_LIST_LAYOUT = [
	{
		component: 'ProductListLink',
		props: {
			children: [
				{
					component: 'ProductListImage',
					props: {},
				},
				{
					component: 'ProductListTitle',
					props: {},
				},
			],
		},
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
		Props: {},
	},
];

let layoutKeys = 0;

/**
 * Maps a layout config into atomic components.
 *
 * @param {object} product Product object to pass to atomic components.
 * @param {object} layoutConfig Object with component data.
 */
export const renderProductLayout = ( product, layoutConfig ) => {
	return layoutConfig.map( ( { component: LayoutComponentName, props = {} } ) => {
		let children = [];

		if ( !! props.children && props.children.length > 0 ) {
			children = renderProductLayout( product, props.children );
		}

		layoutKeys++;

		const LayoutComponent = ATOMIC_COMPONENT_MAP[ LayoutComponentName ];

		return <LayoutComponent key={ 'layout' + layoutKeys + '_' + product.id } { ...props } children={ children } product={ product } />;
	} );
};

/**
 * Converts innerblocks to a list of layout configs.
 *
 * @param {object} innerBlocks Inner block components.
 */
export const getProductLayoutConfig = ( innerBlocks ) => {
	if ( typeof innerBlocks === 'undefined' || innerBlocks.length === 0 ) {
		return DEFAULT_PRODUCT_LIST_LAYOUT;
	}
	return innerBlocks.map( ( block ) => {
		return {
			component: ATOMIC_BLOCK_MAP[ block.name ],
			props: {
				...block.attributes,
				product: undefined,
				children: block.innerBlocks.length > 0 ?
					getProductLayoutConfig( block.innerBlocks ) :
					[],
			},
		};
	} );
};
