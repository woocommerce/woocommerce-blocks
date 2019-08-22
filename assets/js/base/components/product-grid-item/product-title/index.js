/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const ProductTitle = ( { className, product = {} } ) => {
	if ( ! product.name ) {
		return null;
	}

	return (
		<div className={ className }>
			{ product.name }
		</div>
	);
};

ProductTitle.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductTitle;
