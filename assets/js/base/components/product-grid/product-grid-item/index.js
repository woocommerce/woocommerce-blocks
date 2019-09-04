/**
 * External dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
// import ProductLink from '../product-grid-link';
import ProductTitle from '../product-grid-title';
import ProductPrice from '../product-grid-price';
import ProductButton from '../product-grid-button';
import ProductImage from '../product-grid-image';
import ProductRating from '../product-grid-rating';
// import ProductSaleBadge from '../product-grid-sale-badge';

const DEFAULT_LAYOUT_CONFIG = [
	{
		component: ProductImage,
		props: {},
	},
	{
		component: ProductTitle,
		props: {},
	},
	{
		component: ProductPrice,
		props: {},
	},
	{
		component: ProductRating,
		props: {},
	},
	{
		component: ProductButton,
		Props: {},
	},
];

const renderProductItem = ( product, layoutConfig ) => {
	return layoutConfig.map( ( { component: LayoutComponent, props } ) => {
		let children = [];
		if ( props.children.length > 0 ) {
			children = renderProductItem( product, props.children );
		}
		return <LayoutComponent key={ 'layout' + LayoutComponent + product.id } { ...props } children={ children } product={ product } />;
	} );
};

const ProductGridItem = ( { product = {}, children, layoutConfig = DEFAULT_LAYOUT_CONFIG } ) => {
	//const { contentVisibility } = attributes;
	//const { button, price, rating, title, image } = contentVisibility;
	const isLoading = ! Object.keys( product ).length > 0;
	const classes = classnames(
		'wc-block-grid__product',
		{
			'is-loading': isLoading,
		},
	);

	const productRender = children ?
		React.Children.map( children, ( child ) => React.cloneElement( child, { product } ) ) :
		renderProductItem( product, layoutConfig );

	return (
		<li className={ classes } aria-hidden={ isLoading }>
			{ productRender }
		</li>
	);
};

ProductGridItem.propTypes = {
	attributes: PropTypes.object.isRequired,
	product: PropTypes.object,
};

export default ProductGridItem;
