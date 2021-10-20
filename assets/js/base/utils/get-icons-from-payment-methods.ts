/**
 * External dependencies
 */
import type {
	PaymentMethods,
	PaymentMethodIcons as PaymentMethodIconsType,
} from '@woocommerce/type-defs/payments';

export const getIconsFromPaymentMethods = (
	paymentMethods: PaymentMethods
): PaymentMethodIconsType => {
	return Object.values( paymentMethods ).reduce( ( acc, paymentMethod ) => {
		if ( paymentMethod.icons !== null ) {
			acc = acc.concat( paymentMethod.icons );
		}
		return acc;
	}, [] as PaymentMethodIconsType );
};
