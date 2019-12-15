/**
 * Internal dependencies
 */
import { applePayImage } from './apple-pay';
import { paypalImage } from './paypal';

export const ExpressApplePay = () => {
	return <img src={ applePayImage } alt="" />;
};

export const ExpressPaypal = () => {
	return <img src={ paypalImage } alt="" />;
};
