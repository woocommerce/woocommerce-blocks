/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ProductPrice = ( { className, product = {} } ) => {
	const classes = classnames(
		className,
		'price',
	);
	return (
		<div
			className={ classes }
			dangerouslySetInnerHTML={ { __html: product.price_html } }
		/>
	);
};

ProductPrice.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductPrice;
