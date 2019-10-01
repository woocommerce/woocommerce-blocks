/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

const ProductSaleBadge = ( { className, onsale } ) => {
	if ( ! onsale ) {
		return null;
	}

	return (
		<span className={ className }>
			{ __( 'Sale', 'woo-gutenberg-products-block' ) }
		</span>
	);
};

ProductSaleBadge.propTypes = {
	className: PropTypes.string,
	onsale: PropTypes.bool,
};

export default ProductSaleBadge;
