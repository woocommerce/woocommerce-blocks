/**
 * External dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import ProductLink from '../product-grid-link';
import ProductTitle from '../product-grid-title';
import ProductPrice from '../product-grid-price';
import ProductButton from '../product-grid-button';
import ProductImage from '../product-grid-image';
import ProductRating from '../product-grid-rating';
import ProductSaleBadge from '../product-grid-sale-badge';

const ProductGridItem = ( { attributes, product = {}, children } ) => {
	//const { contentVisibility } = attributes;
	//const { button, price, rating, title, image } = contentVisibility;
	const isLoading = ! Object.keys( product ).length > 0;
	const classes = classnames(
		'wc-block-grid__product',
		{
			'is-loading': isLoading,
		},
	);

	const childrenWithProps = React.Children.map( children, ( child ) =>
		React.cloneElement( child, { product } )
	);

	return (
		<li className={ classes } aria-hidden={ isLoading }>
			{ childrenWithProps }
		</li>
	);
};

ProductGridItem.propTypes = {
	attributes: PropTypes.object.isRequired,
	product: PropTypes.object,
};

export default ProductGridItem;
