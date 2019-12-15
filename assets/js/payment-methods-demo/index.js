/**
 * External dependencies
 */
import {
	registerExpressPaymentMethod,
	registerPaymentMethod,
} from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import { ExpressApplePay, ExpressPaypal } from './express-payment';
import { PaypalPaymentMethod, ccPaymentMethod } from './payment-methods';

registerExpressPaymentMethod( 'applepay', ExpressApplePay );
registerExpressPaymentMethod( 'paypal', ExpressPaypal );
registerPaymentMethod( 'paypal', PaypalPaymentMethod );
registerPaymentMethod( 'cc', ccPaymentMethod );
