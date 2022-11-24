/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Icon, currencyDollar } from '@wordpress/icons';
import { objectHasProp } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import './style.scss';

const Block = ( props: {
	orderData: {
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
} ): JSX.Element | null => {
	const { orderData } = props;

	if ( ! orderData || ! objectHasProp( orderData, 'orderNumber' ) ) {
		return null;
	}

	const {
		orderNumber,
		orderDate,
		orderEmail,
		orderTotal,
		orderPaymentMethod,
		billingAddress,
		orderStatusText,
		orderStatus,
	} = orderData;

	const thankYouHeading = sprintf(
		/* translators: %s is referring to the order status */
		__( 'Thank you %s!', 'woo-gutenberg-products-block' ),
		billingAddress.first_name
	);

	let orderStatusHeading = sprintf(
		/* translators: %s is referring to the order status */
		__( 'Your order is %s', 'woo-gutenberg-products-block' ),
		orderStatusText
	);

	switch ( orderStatus ) {
		case 'processing':
			orderStatusHeading = __(
				'Your order is confirmed',
				'woo-gutenberg-products-block'
			);
			break;
		case 'completed':
			orderStatusHeading = __(
				'Your order is complete!',
				'woo-gutenberg-products-block'
			);
			break;
	}

	return (
		<div className="wc-block-components-order-summary">
			<div className="wc-block-components-order-summary-title">
				<div role="doc-subtitle">
					{ sprintf(
						/* translators: %s is referring to the order number */
						__( 'Order #%s', 'woo-gutenberg-products-block' ),
						orderNumber
					) }
				</div>
				<h2>
					<Icon icon={ currencyDollar } /> { thankYouHeading }
				</h2>
			</div>
			<div className="wc-block-components-order-summary-box">
				<h3>{ orderStatusHeading }</h3>
				<ul className="wc-block-components-order-summary-items">
					<li className="wc-block-components-order-summary__order-number">
						{ __(
							'Order number:',
							'woo-gutenberg-products-block'
						) }{ ' ' }
						<strong>{ orderNumber }</strong>
					</li>
					<li className="wc-block-components-order-summary__order-date">
						{ __( 'Date:', 'woo-gutenberg-products-block' ) }{ ' ' }
						<strong>{ orderDate }</strong>
					</li>
					<li className="wc-block-components-order-customer-email">
						{ __( 'Email:', 'woo-gutenberg-products-block' ) }{ ' ' }
						<strong>{ orderEmail }</strong>
					</li>
					<li className="wc-block-components-order-summary__order-total">
						{ __( 'Total:', 'woo-gutenberg-products-block' ) }{ ' ' }
						<strong>{ orderTotal }</strong>
					</li>
					<li className="wc-block-components-order-summary__payment-method">
						{ __(
							'Payment method:',
							'woo-gutenberg-products-block'
						) }{ ' ' }
						<strong>{ orderPaymentMethod }</strong>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Block;
