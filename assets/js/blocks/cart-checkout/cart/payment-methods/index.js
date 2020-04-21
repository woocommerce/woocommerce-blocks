/**
 * External dependencies
 */
import { usePaymentMethods } from '@woocommerce/base-hooks';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Shows a list of registered payment method icons.
 */
const PaymentMethodIcons = () => {
	const { paymentMethods } = usePaymentMethods();

	if ( Object.keys( paymentMethods ).length === 0 ) {
		return null;
	}

	return (
		<div className="wc-block-cart__payment-methods">
			{ Object.values( paymentMethods ).map( ( paymentMethod ) => {
				if ( paymentMethod.icons !== null ) {
					return (
						<Fragment key={ paymentMethod.name }>
							{ paymentMethod.icons }
						</Fragment>
					);
				}
				return null;
			} ) }
		</div>
	);
};

export default PaymentMethodIcons;
