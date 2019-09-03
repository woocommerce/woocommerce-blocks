/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

const ProductSaleBadge = ( { className, product = {} } ) => {
	if ( ! product.onsale ) {
		return null;
	}

	const classes = classnames(
		className,
		'wc-block-grid__product-onsale',
	);

	return (
		<span className={ classes }>
			{ __( 'Sale', 'woo-gutenberg-products-block' ) }
		</span>
	);
};

ProductSaleBadge.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductSaleBadge;
