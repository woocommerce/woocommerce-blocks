/**
 * External dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { renderProductLayout } from '../../../atomic/utils';
import {
	ProductListTitle,
	ProductListPrice,
	ProductListButton,
	ProductListImage,
	ProductListRating,
} from '../../../atomic/components/product-list';

const DEFAULT_LAYOUT_CONFIG = [
	{
		component: ProductListImage,
		props: {},
	},
	{
		component: ProductListTitle,
		props: {},
	},
	{
		component: ProductListPrice,
		props: {},
	},
	{
		component: ProductListRating,
		props: {},
	},
	{
		component: ProductListButton,
		Props: {},
	},
];

const ProductListItem = ( { product = {}, children, layoutConfig = DEFAULT_LAYOUT_CONFIG } ) => {
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
		renderProductLayout( product, layoutConfig );

	return (
		<li className={ classes } aria-hidden={ isLoading }>
			{ productRender }
		</li>
	);
};

ProductListItem.propTypes = {
	attributes: PropTypes.object.isRequired,
	product: PropTypes.object,
};

export default ProductListItem;
