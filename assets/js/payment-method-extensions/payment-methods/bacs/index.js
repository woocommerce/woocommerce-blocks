/**
 * External dependencies
 */
import { registerPaymentMethod } from '@woocommerce/blocks-registry';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PAYMENT_METHOD_NAME } from './constants';

const defaultLabel = __(
	'Direct bank transfer',
	'woo-gutenberg-products-block'
);
const label = defaultLabel;

/**
 * @typedef {import('@woocommerce/type-defs/registered-payment-method-props').RegisteredPaymentMethodProps} RegisteredPaymentMethodProps
 */

/**
 * Content component
 */
const Content = () => {
	return <div>Bank tranfer stuff</div>;
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
 * Bank transfer (BACS) payment method config object.
 */
const bankTransferPaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: <Label />,
	content: <Content />,
	edit: <Content />,
	icons: null,
	canMakePayment: () => true,
	ariaLabel: label,
};

registerPaymentMethod( ( Config ) => new Config( bankTransferPaymentMethod ) );
