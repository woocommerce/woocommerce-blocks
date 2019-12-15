/**
 * External dependencies
 */
import { getExpressPaymentMethods } from '@woocommerce/blocks-registry';
import { useCheckoutData, usePaymentEvents } from '@woocommerce/base-hooks';

const ExpressPaymentMethods = () => {
	const [ checkoutData ] = useCheckoutData();
	const { dispatch, select } = usePaymentEvents();
	const paymentMethods = getExpressPaymentMethods();
	const paymentMethodSlugs = Object.keys( paymentMethods );
	const content =
		paymentMethodSlugs.length > 0 ? (
			paymentMethodSlugs.map( ( slug ) => {
				const ExpressPaymentMethod = paymentMethods[ slug ];
				const paymentEvents = { dispatch, select };
				return (
					<li
						key={ `paymentMethod_${ slug }` }
						id={ `express-payment-method-${ slug }` }
					>
						<ExpressPaymentMethod
							checkoutData={ checkoutData }
							paymentEvents={ paymentEvents }
						/>
					</li>
				);
			} )
		) : (
			<li key="noneRegistered">No registered Payment Methods</li>
		);
	return (
		<ul className="wc-component__express-payment-event-buttons">
			{ content }
		</ul>
	);
};

export default ExpressPaymentMethods;
