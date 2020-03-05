/**
 * External dependencies
 */
import {
	usePaymentMethodInterface,
	useExpressPaymentMethods,
} from '@woocommerce/base-hooks';
import { cloneElement, isValidElement } from '@wordpress/element';

const ExpressPaymentMethods = ( { isEditor } ) => {
	const paymentMethodInterface = usePaymentMethodInterface();
	// not implementing isInitialized here because it's utilized further
	// up in the tree for express payment methods. We won't even get here if
	// there's no payment methods after initialization.
	const { paymentMethods } = useExpressPaymentMethods();
	const paymentMethodSlugs = Object.keys( paymentMethods );
	const content =
		paymentMethodSlugs.length > 0 ? (
			paymentMethodSlugs.map( ( slug ) => {
				const expressPaymentMethod = isEditor
					? paymentMethods[ slug ].edit
					: paymentMethods[ slug ].activeContent;
				return isValidElement( expressPaymentMethod ) ? (
					<li key={ slug } id={ `express-payment-method-${ slug }` }>
						{ cloneElement( expressPaymentMethod, {
							...paymentMethodInterface,
						} ) }
					</li>
				) : null;
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
