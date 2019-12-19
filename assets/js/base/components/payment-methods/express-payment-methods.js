/**
 * External dependencies
 */
import {
	useCheckoutData,
	usePaymentEvents,
	useExpressPaymentMethods,
} from '@woocommerce/base-hooks';

const ExpressPaymentMethods = () => {
	const [ checkoutData ] = useCheckoutData();
	const { dispatch, select } = usePaymentEvents();
	// not implementing isInitialized here because it's utilized further
	// up in the tree for express payment methods. We won't even get here if
	// there's no payment methods after initialization.
	const { paymentMethods } = useExpressPaymentMethods();
	const paymentMethodSlugs = Object.keys( paymentMethods );
	const content =
		paymentMethodSlugs.length > 0 ? (
			paymentMethodSlugs.map( ( slug ) => {
				const ExpressPaymentMethod =
					paymentMethods[ slug ].activeContent;
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
