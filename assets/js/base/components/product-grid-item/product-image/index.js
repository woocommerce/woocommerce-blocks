/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const ProductImage = ( { className, product = {} } ) => {
	return (
		<div
			className={ className }
			dangerouslySetInnerHTML={ { __html: product.thumbnail_html } }
		/>
	);
};

ProductImage.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductImage;
