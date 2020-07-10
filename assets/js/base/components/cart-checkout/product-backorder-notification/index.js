/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ProductBadge from '../product-badge';

/**
 * Returns a backorder notification badge.
 */
const ProductBackorderNotification = () => {
	return (
		<ProductBadge className="wc-block-components-product-backorder-notification">
			{ __( 'Available on backorder', 'woo-gutenberg-products-block' ) }
		</ProductBadge>
	);
};

export default ProductBackorderNotification;
