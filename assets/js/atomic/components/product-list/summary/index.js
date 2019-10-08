/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ProductListSummary = ( {
	className,
	product,
} ) => {
	if ( ! product.description ) {
		return null;
	}

	return (
		<div
			className={ classnames(
				className,
				'wc-block-grid__product-summary'
			) }
			dangerouslySetInnerHTML={ {
				__html: product.description,
			} }
		/>
	);
};

ProductListSummary.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductListSummary;
