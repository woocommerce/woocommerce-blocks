/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ProductListTitle = ( { className, product = {} } ) => {
	if ( ! product.name ) {
		return null;
	}

	const classes = classnames(
		className,
		'wc-block-grid__product-title',
	);

	return (
		<div className={ classes }>
			{ product.name }
		</div>
	);
};

ProductListTitle.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductListTitle;
