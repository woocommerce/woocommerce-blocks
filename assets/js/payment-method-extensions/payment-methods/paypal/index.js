/**
 * External dependencies
 */
import { registerPaymentMethod } from '@woocommerce/blocks-registry';
import { __ } from '@wordpress/i18n';
import { getSetting, WC_ASSET_URL } from '@woocommerce/settings';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { PAYMENT_METHOD_NAME } from './constants';

/** @typedef { import('@woocommerce/type-defs/hooks').StoreCart } StoreCart */

const settings = getSetting( 'paypal_data', {} );

/**
 * Content component
 */
const Content = () => {
	return decodeEntities( settings.description || '' );
};

/**
 * Determine whether the gateway is available for this cart/order.
 *
 * @param {Object} props Incoming props for the component.
 * @param {StoreCart} props.cart Cart Object.
 *
 * @return {boolean}  True if payment method should be displayed as a payment option.
 */
const canMakePayment = ( { cart } ) => {
	return cart.availablePaymentMethods.includes( 'paypal' );
};

const paypalPaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: (
		<img
			src={ `${ WC_ASSET_URL }/images/paypal.png` }
			alt={ decodeEntities(
				settings.title || __( 'PayPal', 'woo-gutenberg-products-block' )
			) }
		/>
	),
	placeOrderButtonLabel: __(
		'Proceed to PayPal',
		'woo-gutenberg-products-block'
	),
	content: <Content />,
	edit: <Content />,
	canMakePayment,
	ariaLabel: decodeEntities(
		settings.title ||
			__( 'Payment via PayPal', 'woo-gutenberg-products-block' )
	),
	supports: {
		features: settings.supports ?? [],
	},
};

registerPaymentMethod( paypalPaymentMethod );
