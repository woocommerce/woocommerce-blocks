/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import type { ReactNode } from 'react';

/**
 * Internal dependencies
 */
import ProductBadge from '../product-badge';

/**
 * Returns a low stock badge.
 *
 * @param {Object}  props                   Incoming props for the component.
 * @param {number} props.lowStockRemaining Whether or not there is low stock remaining.
 */
const ProductLowStockBadge = ( {
	lowStockRemaining,
}: {
	lowStockRemaining: number;
} ): ReactNode => {
	if ( ! lowStockRemaining ) {
		return null;
	}

	return (
		<ProductBadge className="wc-block-components-product-low-stock-badge">
			{ sprintf(
				/* translators: %d stock amount (number of items in stock for product) */
				__( '%d left in stock', 'woo-gutenberg-products-block' ),
				lowStockRemaining
			) }
		</ProductBadge>
	);
};

export default ProductLowStockBadge;
