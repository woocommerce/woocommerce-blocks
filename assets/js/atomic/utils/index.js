import {
	ProductListLink,
	ProductListTitle,
	ProductListPrice,
	ProductListButton,
	ProductListImage,
	ProductListRating,
	ProductListSummary,
	ProductListSaleBadge,
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
	ProductListSummary,
	ProductListSaleBadge,
};

// @todo how to support these using mapping?
//'core/paragraph',
//'core/heading',
/**
 * Map blocks names to component names.
 */
export const BLOCK_MAP = {
	'woocommerce/product-list-price': 'ProductListPrice',
	'woocommerce/product-list-image': 'ProductListImage',
	'woocommerce/product-list-title': 'ProductListTitle',
	'woocommerce/product-list-rating': 'ProductListRating',
	'woocommerce/product-list-button': 'ProductListButton',
	'woocommerce/product-list-summary': 'ProductListSummary',
	'woocommerce/product-list-sale-badge': 'ProductListSaleBadge',
};

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
export const layoutConfigToBlockTemplate = ( layoutConfig ) => {
	return layoutConfig.map( ( layout ) => {
		const block = Object.entries( BLOCK_MAP )
			.find( ( entry ) => entry[ 1 ] === layout.component );

		return Array.isArray( block ) ? [ block[ 0 ], layout.props ] : null;
	} ).filter( Boolean );
};

/**
 * The default template (list of inner blocks) for the product list.
 */
export const DEFAULT_PRODUCT_LIST_TEMPLATE = layoutConfigToBlockTemplate(
	DEFAULT_PRODUCT_LIST_LAYOUT
);

/**
 * Converts innerblocks to a list of layout configs.
 *
 * @param {object[]} innerBlocks Inner block components.
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

/**
 * Maps a layout config into atomic components.
 *
 * @param {object} product Product object to pass to atomic components.
 * @param {object[]} layoutConfig Object with component data.
 * @param {number} componentId Parent component ID needed for key generation.
 */
export const renderProductLayout = ( product, layoutConfig, componentId ) => {
	return layoutConfig.map(
		( { component: LayoutComponentName, props = {} }, index ) => {
			let children = [];

			if ( !! props.children && props.children.length > 0 ) {
				children = renderProductLayout(
					product,
					props.children,
					componentId
				);
			}

			const LayoutComponent = COMPONENT_MAP[ LayoutComponentName ];
			const productID = product.id || 0;
			const keyParts = [
				'layout',
				LayoutComponentName,
				index,
				componentId,
				productID,
			];

			return (
				<LayoutComponent
					key={ keyParts.join( '_' ) }
					{ ...props }
					children={ children }
					product={ product }
				/>
			);
		}
	);
};
