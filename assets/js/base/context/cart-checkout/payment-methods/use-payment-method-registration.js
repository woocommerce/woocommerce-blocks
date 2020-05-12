/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	getPaymentMethods,
	getExpressPaymentMethods,
} from '@woocommerce/blocks-registry';
import { useState, useEffect, useRef } from '@wordpress/element';
import {
	useEditorContext,
	useShippingDataContext,
} from '@woocommerce/base-context';
import { useStoreCart } from '@woocommerce/base-hooks';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

/**
 * If there was an error registering a payment method, alert the admin.
 *
 * @param {Object} error Error object.
 */
const handleRegistrationError = ( error ) => {
	if ( CURRENT_USER_IS_ADMIN ) {
		throw new Error(
			sprintf(
				__(
					// translators: %s is the error method returned by the payment method.
					'Problem with payment method initialization: %s',
					'woo-gutenberg-products-block'
				),
				error.message
			)
		);
	}
};

/**
 * This hook handles initializing registered payment methods and exposing all
 * registered payment methods that can be used in the current environment (via
 * the payment method's `canMakePayment` property).
 *
 * @param  {function(Object):undefined} dispatcher               A dispatcher for setting registered
 *                                                               payment methods to an external
 *                                                               state.
 * @param  {Object}                     registeredPaymentMethods Registered payment methods to
 *                                                               process.
 *
 * @return {boolean} Whether the payment methods have been initialized or not. True when all payment
 *                   methods have been initialized.
 */
const usePaymentMethodRegistration = (
	dispatcher,
	registeredPaymentMethods
) => {
	const [ isInitialized, setIsInitialized ] = useState( false );

	/**
	 * @type {Object} initializedMethodsDefault Holds payment methods that have been initialized.
	 */
	const [
		initializedPaymentMethods,
		setInitializedPaymentMethods,
	] = useState( {} );

	const { isEditor } = useEditorContext();
	const { shippingAddress } = useShippingDataContext();
	const { cartTotals, cartNeedsShipping } = useStoreCart();
	const canPayArgument = useRef( {
		cartTotals,
		cartNeedsShipping,
		shippingAddress,
	} );

	/**
	 * Update initialized payment methods in local state.
	 *
	 * @param {Object} paymentMethod Payment method object that has been initialized.
	 * @param {boolean} enabled True if the method can be used, or false if payment is not possible via this method.
	 */
	const setInitializedPaymentMethod = ( paymentMethod, enabled = true ) => {
		setInitializedPaymentMethods( ( paymentMethods ) => ( {
			...paymentMethods,
			[ paymentMethod.name ]: {
				enabled,
				paymentMethod,
			},
		} ) );
	};

	useEffect( () => {
		canPayArgument.current = {
			cartTotals,
			cartNeedsShipping,
			shippingAddress,
		};
	}, [ cartTotals, cartNeedsShipping, shippingAddress ] );

	// Initialize payment methods on mount.
	// Note: registeredPaymentMethods is not a dependency because this will not
	// change in the life of the hook, it comes from an externally set value.
	useEffect( () => {
		for ( const paymentMethodName in registeredPaymentMethods ) {
			const current = registeredPaymentMethods[ paymentMethodName ];

			if ( isEditor ) {
				setInitializedPaymentMethod( current );
				continue;
			}

			Promise.resolve( current.canMakePayment( canPayArgument.current ) )
				.then( ( canPay ) => {
					if ( canPay.error ) {
						throw new Error( canPay.error.message );
					}
					setInitializedPaymentMethod( current, canPay );
				} )
				.catch( handleRegistrationError );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ isEditor ] );

	// As payment methods are initialized once promises resolve, see if we're finished, resort to be
	// in the same order as registered and then set via the dispatcher.
	// Note: registeredPaymentMethods is not a dependency because this will not
	// change in the life of the hook, it comes from an externally set value.
	useEffect( () => {
		if (
			! isInitialized &&
			Object.keys( initializedPaymentMethods ).length ===
				Object.keys( registeredPaymentMethods ).length
		) {
			const newSet = {};
			for ( const paymentMethodName in registeredPaymentMethods ) {
				if (
					initializedPaymentMethods[ paymentMethodName ] &&
					initializedPaymentMethods[ paymentMethodName ].enabled
				) {
					newSet[ paymentMethodName ] =
						initializedPaymentMethods[
							paymentMethodName
						].paymentMethod;
				}
			}
			dispatcher( newSet );
			setIsInitialized( true );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ initializedPaymentMethods, dispatcher, isInitialized ] );

	return isInitialized;
};

export const usePaymentMethods = ( dispatcher ) =>
	usePaymentMethodRegistration( dispatcher, getPaymentMethods() );
export const useExpressPaymentMethods = ( dispatcher ) =>
	usePaymentMethodRegistration( dispatcher, getExpressPaymentMethods() );
