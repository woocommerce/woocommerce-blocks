/**
 * External dependencies
 */
import {
	ExpressPaymentMethodConfigInstance,
	PaymentMethodConfigInstance,
} from '@woocommerce/type-defs/payments';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/settings';
import { dispatch, select } from '@wordpress/data';
import { deriveSelectedShippingRates } from '@woocommerce/base-utils';
import {
	getExpressPaymentMethods,
	getPaymentMethods,
} from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import { STORE_KEY as CART_STORE_KEY } from '../cart/constants';
import { STORE_KEY as PAYMENT_METHOD_DATA_STORE_KEY } from '../payment-methods/constants';

export const checkPaymentMethodsCanPay = async ( express = false ) => {
	let availablePaymentMethods = {};
	const paymentMethods = express
		? getExpressPaymentMethods()
		: getPaymentMethods();

	const addAvailablePaymentMethod = (
		paymentMethod:
			| PaymentMethodConfigInstance
			| ExpressPaymentMethodConfigInstance
	) => {
		availablePaymentMethods = {
			...availablePaymentMethods,
			[ paymentMethod.name ]: paymentMethod,
		};
	};

	const cart = select( CART_STORE_KEY ).getCartData();
	const selectedShippingMethods = deriveSelectedShippingRates(
		cart.shippingRates
	);
	const canPayArgument = {
		cart,
		cartTotals: cart.totals,
		cartNeedsShipping: cart.needsShipping,
		billingData: cart.billingAddress,
		shippingAddress: cart.shippingAddress,
		selectedShippingMethods,
		paymentRequirements: cart.paymentRequirements,
	};

	for ( const paymentMethod of Object.values( paymentMethods ) ) {
		if ( ! paymentMethod ) {
			continue;
		}

		// See if payment method should be available. This always evaluates to true in the editor context.
		try {
			const isEditor = !! select( 'core/editor' );
			const canPay = isEditor
				? true
				: await Promise.resolve(
						paymentMethod.canMakePayment( canPayArgument )
				  );

			if ( canPay ) {
				if ( typeof canPay === 'object' && canPay.error ) {
					throw new Error( canPay.error.message );
				}

				addAvailablePaymentMethod( paymentMethod );
			}
		} catch ( e ) {
			if ( CURRENT_USER_IS_ADMIN ) {
				// TODO: When https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/6159 is merged we can interact with the data store.
				// const errorText = sprintf(
				// 	/* translators: %s the id of the payment method being registered (bank transfer, cheque...) */
				// 	__(
				// 		`There was an error registering the payment method with id '%s': `,
				// 		'woo-gutenberg-products-block'
				// 	),
				// 	paymentMethod.paymentMethodId
				// );
				// addErrorNotice( `${ errorText } ${ e }`, {
				// 	context: noticeContext,
				// 	id: `wc-${ paymentMethod.paymentMethodId }-registration-error`,
				// } );
				return false;
			}
		}
	}
	const currentlyAvailablePaymentMethods = express
		? select(
				PAYMENT_METHOD_DATA_STORE_KEY
		  ).getAvailableExpressPaymentMethods()
		: select( PAYMENT_METHOD_DATA_STORE_KEY ).getAvailablePaymentMethods();

	const availablePaymentMethodNames = Object.keys( availablePaymentMethods );
	if (
		currentlyAvailablePaymentMethods.length ===
			availablePaymentMethodNames.length &&
		currentlyAvailablePaymentMethods.every( ( current ) =>
			availablePaymentMethodNames.includes( current )
		)
	) {
		// All the names are the same, no need to dispatch more actions.
		return true;
	}

	const { setAvailablePaymentMethods, setAvailableExpressPaymentMethods } =
		dispatch( PAYMENT_METHOD_DATA_STORE_KEY );
	if ( express ) {
		setAvailableExpressPaymentMethods( availablePaymentMethodNames );
		return true;
	}
	setAvailablePaymentMethods( availablePaymentMethodNames );
	return true;
};
