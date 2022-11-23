/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';

const Block = (): JSX.Element | null => {
	const orderData = getSetting( 'orderReceivedData', {} );

	if ( ! orderData ) {
		return null;
	}

	console.log( orderData );

	return (
		<ul className="wc-block-components-order-summary">
			<li className="wc-block-components-order-summary__order-number">
				{ __( 'Order number:', 'woo-gutenberg-products-block' ) }{ ' ' }
				<strong>{ orderData.orderNumber }</strong>
			</li>
			<li className="wc-block-components-order-summary__order-date">
				{ __( 'Date:', 'woo-gutenberg-products-block' ) }{ ' ' }
				<strong>{ orderData.orderDate }</strong>
			</li>
			<li className="wc-block-components-order-customer-email">
				{ __( 'Email:', 'woo-gutenberg-products-block' ) }{ ' ' }
				<strong>{ orderData.orderEmail }</strong>
			</li>
			<li className="wc-block-components-order-summary__order-total">
				{ __( 'Total:', 'woo-gutenberg-products-block' ) }{ ' ' }
				<strong>{ orderData.orderTotal }</strong>
			</li>
			<li className="wc-block-components-order-summary__payment-method">
				{ __( 'Payment method:', 'woo-gutenberg-products-block' ) }{ ' ' }
				<strong>{ orderData.orderPaymentMethod }</strong>
			</li>
		</ul>
	);
};

export default Block;
