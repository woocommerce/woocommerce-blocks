/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const ProductLink = ( { children, className, product = {} } ) => {
	return (
		<a
			href={ product.permalink }
			className={ className }
			rel="nofollow"
		>
			{ children }
		</a>
	);
};

ProductLink.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductLink;
