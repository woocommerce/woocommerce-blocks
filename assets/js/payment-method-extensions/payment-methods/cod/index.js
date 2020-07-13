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

const settings = getSetting( 'cod_data', {} );
const defaultLabel = __(
	'Cash on delivery',
	'woo-gutenberg-products-block'
);
const label = decodeEntities( settings.title ) || defaultLabel;

/**
 * @typedef {import('@woocommerce/type-defs/registered-payment-method-props').RegisteredPaymentMethodProps} RegisteredPaymentMethodProps
 */

/**
 * Content component
 */
const Content = () => {
	return <div>{ decodeEntities( settings.description || '' ) }</div>;
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
 * Determine whether COD is available for this cart/order.
 *
 * @param boolean cartNeedsShipping True if the cart contains any physical/shippable products.
 * @return boolean True if COD payment method should be displayed as a payment option.
 */
const canMakePayment = ( { cartNeedsShipping, selectedShippingMethods } ) => {
	if ( ! settings.enableForVirtual && ! cartNeedsShipping ) {
		// Store doesn't allow COD for virtual orders AND
		// order doesn't contain any shippable products.
		return false;
	}

	if ( ! settings.enableForShippingMethods ) {
		// Store does not limit COD to specific shipping methods.
		return true;
	}

	// Look for an not-supported shipping method in the user's selected
	// shipping methods. If one is found, then COD is not allowed.
	const selectedNotSupported = Object.values( selectedShippingMethods ).find(
		( shippingMethodId ) => {
			return ! settings.enableForShippingMethods.includes(
				shippingMethodId
			);
		}
	);
	return ! selectedNotSupported;
};

/**
 * Cash on Delivery (COD) payment method config object.
 */
const cashOnDeliveryPaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: <Label />,
	content: <Content />,
	edit: <Content />,
	icons: null,
	canMakePayment,
	ariaLabel: label,
};

registerPaymentMethod( ( Config ) => new Config( cashOnDeliveryPaymentMethod ) );
