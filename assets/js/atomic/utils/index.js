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
export const COMPONENT_MAP = {
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
export const BLOCK_MAP = {
	'woocommerce/product-list-image': 'ProductListImage',
	'woocommerce/product-list-price': 'ProductListPrice',
	'woocommerce/product-list-title': 'ProductListTitle',
	'woocommerce/product-list-rating': 'ProductListRating',
	'woocommerce/product-list-button': 'ProductListButton',
};
// @todo how to support these using mapping?
//'core/paragraph',
//'core/heading',

/**
 * The default template (list of inner blocks) for the product list.
 */
export const DEFAULT_PRODUCT_LIST_TEMPLATE = [
	[ 'woocommerce/product-list-image', {} ],
	[ 'woocommerce/product-list-title', {} ],
	[ 'woocommerce/product-list-price', {} ],
	[ 'woocommerce/product-list-rating', {} ],
	[ 'woocommerce/product-list-button', {} ],
];

export const DEFAULT_PRODUCT_LIST_LAYOUT = [
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
		Props: {},
	},
];

/**
 * Maps a layout config into atomic components.
 *
 * @param {object} product Product object to pass to atomic components.
 * @param {object} layoutConfig Object with component data.
 * @param {number} componentId Parent component ID needed for key generation.
 */
export const renderProductLayout = ( product, layoutConfig, componentId ) => {
	return layoutConfig.map(
		( { component: LayoutComponentName, props = {} } ) => {
			let children = [];

			if ( !! props.children && props.children.length > 0 ) {
				children = renderProductLayout(
					product,
					props.children,
					componentId
				);
			}

			const LayoutComponent = COMPONENT_MAP[ LayoutComponentName ];

			return (
				<LayoutComponent
					key={
						'layout' +
						LayoutComponentName +
						'_' +
						componentId +
						'_' +
						product.id
					}
					{ ...props }
					children={ children }
					product={ product }
				/>
			);
		}
	);
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
			component: BLOCK_MAP[ block.name ],
			props: {
				...block.attributes,
				product: undefined,
				children:
					block.innerBlocks.length > 0
						? getProductLayoutConfig( block.innerBlocks )
						: [],
			},
		};
	} );
};
