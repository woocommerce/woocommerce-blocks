/**
 * External dependencies
 */
import { getIconsFromPaymentMethods } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import { usePaymentMethods } from '~/base/context/hooks';
import { PaymentMethodIcons } from '~/base/components/cart-checkout';

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { paymentMethods } = usePaymentMethods();

	return (
		<PaymentMethodIcons
			className={ className }
			icons={ getIconsFromPaymentMethods( paymentMethods ) }
		/>
	);
};

export default Block;
