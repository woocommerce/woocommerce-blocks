/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import classnames from 'classnames';

const ProductListTitle = ( {
	className,
	product,
	headingLevel,
	productLink,
} ) => {
	if ( ! product.name ) {
		return null;
	}

	const TagName = `h${ headingLevel }`;

	return (
		<TagName
			className={ classnames(
				className,
				'wc-block-grid__product-title'
			) }
		>
			{ !! productLink ? (
				<a href={ product.permalink } rel="nofollow">
					{ product.name }
				</a>
			) : (
				<Fragment>{ product.name }</Fragment>
			) }
		</TagName>
	);
};

ProductListTitle.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
	headingLevel: PropTypes.number,
	productLink: PropTypes.bool,
};

ProductListTitle.defaultProps = {
	headingLevel: 2,
	productLink: true,
};

export default ProductListTitle;
