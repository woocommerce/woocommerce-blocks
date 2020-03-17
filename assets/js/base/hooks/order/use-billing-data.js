/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Exposes billing data api interface from the payment method data context.
 *
 * @param shippingAsBillingEnabled
 */
export const useBillingData = ( shippingAsBillingEnabled ) => {
	const result = useSelect( ( select, { dispatch } ) => {
		const store = select( storeKey );
		const billingAddress = store.getBillingAddress();
		const shippingAsBilling = store.getShippingAsBilling(
			shippingAsBillingEnabled
		);
		const { setBillingAddress, setShippingAsBilling } = dispatch(
			storeKey
		);

		return {
			billingAddress,
			setBillingAddress,
			shippingAsBilling,
			setShippingAsBilling,
		};
	} );
	return {
		...result,
	};
};
