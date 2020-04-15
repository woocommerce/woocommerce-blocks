/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { loadStripe } from '../stripe-utils';
import { StripeCreditCard } from './payment-method';
import { PAYMENT_METHOD_NAME } from './constants';

const stripePromise = loadStripe();

const Edit = ( props ) => {
	const [ errorMessage, setErrorMessage ] = useState( '' );

	useEffect( () => {
		Promise.resolve( stripePromise ).then( ( { error } ) => {
			setErrorMessage( error.message );
		} );
	}, [ stripePromise, setErrorMessage ] );

	return ! errorMessage ? (
		<StripeCreditCard stripe={ stripePromise } { ...props } />
	) : (
		<div className="components-notice is-error">
			{ errorMessage ||
				__(
					'There was an error loading Stripe.',
					'woo-gutenberg-products-block'
				) }
		</div>
	);
};

const stripeCcPaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: (
		<strong>
			{ __( 'Credit/Debit Card', 'woo-gutenberg-products-block' ) }
		</strong>
	),
	content: <StripeCreditCard stripe={ stripePromise } />,
	edit: <Edit />,
	canMakePayment: () => stripePromise,
	ariaLabel: __(
		'Stripe Credit Card payment method',
		'woo-gutenberg-products-block'
	),
};

export default stripeCcPaymentMethod;
