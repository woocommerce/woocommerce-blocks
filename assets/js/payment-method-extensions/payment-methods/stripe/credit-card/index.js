/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { Icon, card } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import { loadStripe } from '../stripe-utils';
import { StripeCreditCard, getStripeCreditCardIcons } from './payment-method';
import { PAYMENT_METHOD_NAME } from './constants';

const stripePromise = loadStripe();

const StripeComponent = ( props ) => {
	const [ errorMessage, setErrorMessage ] = useState( '' );

	useEffect( () => {
		Promise.resolve( stripePromise ).then( ( { error } ) => {
			if ( error ) {
				setErrorMessage( error.message );
			}
		} );
	}, [] );

	useEffect( () => {
		if ( errorMessage ) {
			throw new Error( errorMessage );
		}
	}, [ errorMessage ] );

	return <StripeCreditCard stripe={ stripePromise } { ...props } />;
};

const StripeLabel = () => {
	return (
		<span className="payment-method-label-with-icon">
			<Icon srcElement={ card } />
			{ __( 'Credit / Debit Card', 'woo-gutenberg-products-block' ) }
		</span>
	);
};

const cardIcons = getStripeCreditCardIcons();
const stripeCcPaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: <StripeLabel />,
	content: <StripeComponent />,
	edit: <StripeComponent />,
	icons: cardIcons,
	canMakePayment: () => stripePromise,
	ariaLabel: __(
		'Stripe Credit Card payment method',
		'woo-gutenberg-products-block'
	),
	supports: {
		savePaymentInfo: true,
	},
};

export default stripeCcPaymentMethod;
