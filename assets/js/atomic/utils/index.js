import {
	ProductListLink,
	ProductListTitle,
	ProductListPrice,
	ProductListButton,
	ProductListImage,
	ProductListRating,
} from '../components/product-list';

let layoutKeys = 0;

/**
 * Maps a layout config into atomic components.
 *
 * @param {object} product Product object to pass to atomic components.
 * @param {object} layoutConfig Object with component data.
 */
export const renderProductLayout = ( product, layoutConfig ) => {
	return layoutConfig.map( ( { component: LayoutComponent, props } ) => {
		let children = [];

		if ( props.children.length > 0 ) {
			children = renderProductLayout( product, props.children );
		}

		layoutKeys++;

		return <LayoutComponent key={ 'layout' + layoutKeys + '_' + product.id } { ...props } children={ children } product={ product } />;
	} );
};

/**
 * Map blocks to components.
 */
export const productLayoutBlockMap = {
	'woocommerce/product-list-link': ProductListLink,
	'woocommerce/product-list-image': ProductListImage,
	'woocommerce/product-list-price': ProductListPrice,
	'woocommerce/product-list-title': ProductListTitle,
	'woocommerce/product-list-rating': ProductListRating,
	'woocommerce/product-list-button': ProductListButton,
};

/**
 * Converts innerblocks to a list of layout configs.
 *
 * @param {object} innerBlocks Inner block components.
 */
export const getProductLayoutConfig = ( innerBlocks ) => {
	return innerBlocks.map( ( block ) => {
		return {
			component: productLayoutBlockMap[ block.name ],
			props: {
				...block.attributes,
				children: block.innerBlocks.length > 0 ?
					getProductLayoutConfig( block.innerBlocks ) :
					[],
			},
		};
	} );
};
