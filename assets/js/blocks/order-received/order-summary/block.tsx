/**
 * External dependencies
 */
import { __, _x, sprintf } from '@wordpress/i18n';
import { createInterpolateElement, RawHTML } from '@wordpress/element';
import { Icon } from '@wordpress/icons';
import { checkCircle } from '@woocommerce/icons';
import { objectHasProp } from '@woocommerce/types';
import type {
	CartShippingAddress,
	CartBillingAddress,
} from '@woocommerce/types';
import { formatPrice } from '@woocommerce/price-format';
import { getDate, gmdateI18n } from '@wordpress/date';

/**
 * Internal dependencies
 */
import './style.scss';

type OrderDataType = {
	orderNumber: string;
	orderDate: string;
	orderTotal: string;
	orderCurrency: string;
	orderEmail: string;
	orderPaymentMethod: string;
	orderPaymentMethodTitle: string;
	orderStatusText: string;
	orderStatus: string;
	billingAddress: CartBillingAddress;
	shippingAddress: CartShippingAddress;
	orderBillingAddress: string;
	orderShippingAddress: string;
};

const OrderSummaryHeading = ( {
	orderData,
}: {
	orderData: OrderDataType;
} ): JSX.Element => {
	const thankYouHeading = sprintf(
		/* translators: %s is referring to the order status */
		__( 'Thank you %s!', 'woo-gutenberg-products-block' ),
		orderData.billingAddress.first_name
	);

	return (
		<div className="wc-block-components-order-summary__heading">
			<Icon icon={ checkCircle } />
			<div role="doc-subtitle">
				{ sprintf(
					/* translators: %s is referring to the order number */
					__( 'Order #%s', 'woo-gutenberg-products-block' ),
					orderData.orderNumber
				) }
			</div>
			<h2>{ thankYouHeading }</h2>
		</div>
	);
};

const OrderSummaryStatus = ( {
	orderData,
}: {
	orderData: OrderDataType;
} ): JSX.Element => {
	let orderStatusHeading = sprintf(
		/* translators: %s is referring to the order status */
		__( 'Your order is %s', 'woo-gutenberg-products-block' ),
		orderData.orderStatusText
	);
	let orderStatusDescription = '';

	switch ( orderData.orderStatus ) {
		case 'pending':
			orderStatusDescription = __(
				"We've received your order and will start processing it once payment has been verified.",
				'woo-gutenberg-products-block'
			);
			break;
		case 'on-hold':
			orderStatusHeading = __(
				'Your order is pending approval',
				'woo-gutenberg-products-block'
			);
			orderStatusDescription = __(
				"We've received your order and will start getting it ready once approved.",
				'woo-gutenberg-products-block'
			);
			break;
		case 'processing':
			orderStatusHeading = __(
				'Your order is confirmed',
				'woo-gutenberg-products-block'
			);
			orderStatusDescription = __(
				"We've received your order and we're getting it ready.",
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

	const date = getDate( orderData.orderDate );
	const formattedDate = gmdateI18n(
		_x(
			'F j, Y',
			'post schedule full date format',
			'woo-gutenberg-products-block'
		),
		date
	);

	return (
		<div className="wc-block-components-order-summary__status">
			<h3>{ orderStatusHeading }</h3>
			<p>
				{ orderStatusDescription ? orderStatusDescription + ' ' : '' }
				{ createInterpolateElement(
					__(
						'A confirmation email has been sent to <email/>. Come back to this page to see updates regarding your order status.',
						'woo-gutenberg-products-block'
					),
					{
						email: <strong>{ orderData.orderEmail }</strong>,
					}
				) }
			</p>
			<ul className="wc-block-components-order-summary__status_items">
				<li className="wc-block-components-order-summary__status_item">
					{ __( 'Date:', 'woo-gutenberg-products-block' ) }{ ' ' }
					<strong>{ formattedDate }</strong>
				</li>
				<li className="wc-block-components-order-summary__status_item">
					{ __( 'Total:', 'woo-gutenberg-products-block' ) }{ ' ' }
					<strong>
						{ formatPrice(
							orderData.orderTotal,
							orderData.orderCurrency
						) }
					</strong>
				</li>
				<li className="wc-block-components-order-summary__status_item">
					{ __( 'Payment method:', 'woo-gutenberg-products-block' ) }{ ' ' }
					<strong>
						{ orderData.orderPaymentMethodTitle ||
							orderData.orderPaymentMethod }
					</strong>
				</li>
			</ul>
		</div>
	);
};

const Address = ( { address }: { address: string } ) => {
	return (
		<address>
			<RawHTML>{ address }</RawHTML>
		</address>
	);
};

const OrderSummaryCustomer = ( {
	orderData,
}: {
	orderData: OrderDataType;
} ): JSX.Element => {
	return (
		<div className="wc-block-components-order-summary__customer">
			{ orderData.orderShippingAddress !== '' && (
				<div className="wc-block-components-order-summary__customer_address">
					<h3>
						{ __(
							'Shipping address',
							'woo-gutenberg-products-block'
						) }
					</h3>
					<Address address={ orderData.orderShippingAddress } />
				</div>
			) }
			{ orderData.orderBillingAddress !== '' && (
				<div className="wc-block-components-order-summary__customer_address">
					<h3>
						{ __(
							'Billing address',
							'woo-gutenberg-products-block'
						) }
					</h3>
					<Address address={ orderData.orderBillingAddress } />
				</div>
			) }
		</div>
	);
};

const Block = ( props: { orderData: OrderDataType } ): JSX.Element | null => {
	const { orderData } = props;

	if ( ! orderData || ! objectHasProp( orderData, 'orderNumber' ) ) {
		return null;
	}

	return (
		<div className="wc-block-components-order-summary">
			<OrderSummaryHeading orderData={ orderData } />
			<OrderSummaryStatus orderData={ orderData } />
			<OrderSummaryCustomer orderData={ orderData } />
		</div>
	);
};

export default Block;
