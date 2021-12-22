/**
 * External dependencies
 */
import { registerPaymentMethod } from '@woocommerce/blocks-registry';
import { __ } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { PAYMENT_METHOD_NAME } from './constants';

/** @typedef { import('@woocommerce/type-defs/hooks').StoreCart } StoreCart */

const settings = getSetting( 'cheque_data', {} );
const defaultLabel = __( 'Check payment', 'woo-gutenberg-products-block' );
const label = decodeEntities( settings.title ) || defaultLabel;

/**
 * Content component
 */
const Content = () => {
	return decodeEntities( settings.description || '' );
};

/**
 * Label component
 *
 * @param {*} props Props from payment API.
 */
const Label = ( props ) => {
	const { PaymentMethodLabel } = props.components;
	return <PaymentMethodLabel text={ label } />;
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
	return cart.availablePaymentMethods.includes( 'cheque' );
};

/**
 * Cheque payment method config object.
 */
const offlineChequePaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: <Label />,
	content: <Content />,
	edit: <Content />,
	canMakePayment,
	ariaLabel: label,
	supports: {
		features: settings?.supports ?? [],
	},
};

registerPaymentMethod( offlineChequePaymentMethod );
