/**
 * Internal dependencies
 */
import { paypalSvg } from './paypal';
import { ccSvg } from './cc';

export const PaypalPaymentMethod = {
	tab: () => <img src={ paypalSvg } alt="" />,
	content: () => (
		<div>
			<p>This is where paypal payment method stuff would be.</p>
		</div>
	),
	ariaLabel: 'paypal payment method',
};

export const ccPaymentMethod = {
	tab: () => <img src={ ccSvg } alt="" />,
	content: () => (
		<div>
			<p>This is where cc payment method stuff would be.</p>
		</div>
	),
	ariaLabel: 'credit-card-payment-method',
};
