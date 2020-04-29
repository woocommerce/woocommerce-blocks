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

const settings = getSetting( 'paypal_data', {} );

/**
 * @typedef {import('@woocommerce/type-defs/registered-payment-method-props').RegisteredPaymentMethodProps} RegisteredPaymentMethodProps
 */

/**
 * Content component
 */
const Content = () => {
	return <div>{ decodeEntities( settings.description || '' ) }</div>;
};

const paypalPaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: (
		<strong>
			<img
				src={ `${ WC_ASSET_URL }/images/paypal.png` }
				alt={ decodeEntities(
					settings.title ||
						__( 'PayPal', 'woo-gutenberg-products-block' )
				) }
			/>
		</strong>
	),
	content: <Content />,
	edit: <Content />,
	icons: null,
	canMakePayment: () => true,
	ariaLabel: decodeEntities(
		settings.title ||
			__( 'Payment via PayPal', 'woo-gutenberg-products-block' )
	),
};

registerPaymentMethod( ( Config ) => new Config( paypalPaymentMethod ) );
