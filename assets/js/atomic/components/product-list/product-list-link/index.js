/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ProductListLink = ( { children, className, product = {} } ) => {
	const classes = classnames(
		className,
		'wc-block-grid__product-link',
	);

	return (
		<a
			href={ product.permalink }
			className={ classes }
			rel="nofollow"
		>
			{ children }
		</a>
	);
};

ProductListLink.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductListLink;
