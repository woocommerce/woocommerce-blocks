/**
 * External dependencies
 */
import { noticeContexts } from '@woocommerce/base-context';
import { StoreNoticesContainer } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { PaymentMethods } from '../../../cart-checkout-shared/payment-methods';

const Block = (): JSX.Element | null => {
	return (
		<>
			<StoreNoticesContainer context={ noticeContexts.PAYMENTS } />
			<PaymentMethods />
		</>
	);
};

export default Block;
