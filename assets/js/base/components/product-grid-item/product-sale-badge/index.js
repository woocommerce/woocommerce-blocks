/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

const ProductSaleBadge = ( { className, product = {} } ) => {
	if ( ! product.onsale ) {
		return null;
	}

	return (
		<span className={ className }>
			{ __( 'Sale!', 'woo-gutenberg-products-block' ) }
		</span>
	);
};

ProductSaleBadge.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductSaleBadge;
