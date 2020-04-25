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

const settings = getSetting( 'paypal_data', {} );

/**
 * @typedef {import('@woocommerce/type-defs/registered-payment-method-props').RegisteredPaymentMethodProps} RegisteredPaymentMethodProps
 */

/**
 * PayPal content component
 *
 * @param {RegisteredPaymentMethodProps|Object} props Incoming props
 */
const Content = ( { activePaymentMethod } ) => {
	return activePaymentMethod === PAYMENT_METHOD_NAME ? (
		<div>{ decodeEntities( settings.description || '' ) }</div>
	) : null;
};

const Edit = ( props ) => {
	return <Content { ...props } />;
};

const paypalPaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: (
		<strong>
			{ decodeEntities(
				settings.title || __( 'PayPal', 'woo-gutenberg-products-block' )
			) }
		</strong>
	),
	content: <Content />,
	edit: <Edit />,
	canMakePayment: () => true,
	ariaLabel: decodeEntities(
		settings.title ||
			__( 'Payment via PayPal', 'woo-gutenberg-products-block' )
	),
};

registerPaymentMethod( ( Config ) => new Config( paypalPaymentMethod ) );
