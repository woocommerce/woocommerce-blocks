/**
 * External dependencies
 */
import { renderFrontend } from '@woocommerce/base-utils';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import Block from './block';

const orderData = getSetting( 'orderReceivedData', {} ) as {
	orderNumber: string;
	orderDate: string;
	orderTotal: string;
	orderEmail: string;
	orderPaymentMethod: string;
	orderStatusText: string;
	orderStatus: string;
	billingAddress: {
		first_name: string;
	};
};

const getProps = () => {
	return {
		// attributes: parseAttributes( el.dataset ),
		// isEditor: false,
		orderData,
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-order-received-order-summary',
	Block,
	getProps,
} );
