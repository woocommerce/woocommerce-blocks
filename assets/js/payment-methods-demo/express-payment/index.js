/**
 * Internal dependencies
 */
import { paypalImage } from './paypal';
import {
	PAYMENT_METHOD_NAME,
	ApplePayExpress,
	applePayImage,
} from './apple-pay';

export const ExpressPaypal = () => <img src={ paypalImage } alt="" />;

const ApplePayPreview = () => <img src={ applePayImage } alt="" />;

export const ApplePayConfig = {
	id: PAYMENT_METHOD_NAME,
	activeContent: <ApplePayExpress />,
	edit: <ApplePayPreview />,
	// for stripe apple pay, the rendering of the button will be determined by
	// by the component so we let checkout know that it's okay to use this.
	canMakePayment: Promise.resolve( true ),
};
