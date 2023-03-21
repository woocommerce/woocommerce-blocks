/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { TotalsItem } from '@woocommerce/blocks-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import {
	usePaymentMethods,
	useStoreCart,
} from '@woocommerce/base-context/hooks';
import PaymentMethodIcons from '@woocommerce/base-components/cart-checkout/payment-method-icons';
import { getIconsFromPaymentMethods } from '@woocommerce/base-utils';
import { getSetting } from '@woocommerce/settings';
import { PaymentEventsProvider } from '@woocommerce/base-context';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import CartButton from '../mini-cart-cart-button-block/block';
import CheckoutButton from '../mini-cart-checkout-button-block/block';

const PaymentMethodIconsElement = (): JSX.Element => {
	const { paymentMethods } = usePaymentMethods();
	return (
		<PaymentMethodIcons
			icons={ getIconsFromPaymentMethods( paymentMethods ) }
		/>
	);
};

interface Props {
	children: JSX.Element | JSX.Element[];
	className?: string;
	cartButtonLabel: string;
	checkoutButtonLabel: string;
}
//
// const CartButton = ( {
// 	url,
// 	label,
// }: {
// 	url: string;
// 	label: string;
// } ): JSX.Element | null => {
// 	if ( ! url ) {
// 		return null;
// 	}
//
// 	return (
// 		<Button
// 			className="wc-block-mini-cart__footer-cart"
// 			href={ url }
// 			variant="outlined"
// 		>
// 			{ label }
// 		</Button>
// 	);
// };
// const CheckoutButton = ( {
// 	url,
// 	label,
// }: {
// 	url: string;
// 	label: string;
// } ): JSX.Element | null => {
// 	if ( ! url ) {
// 		return null;
// 	}
// 	return (
// 		<Button className="wc-block-mini-cart__footer-checkout" href={ url }>
// 			{ label }
// 		</Button>
// 	);
// };

const Block = ( {
	children,
	className,
	cartButtonLabel,
	checkoutButtonLabel,
}: Props ): JSX.Element => {
	const { cartTotals } = useStoreCart();
	const subTotal = getSetting( 'displayCartPricesIncludingTax', false )
		? parseInt( cartTotals.total_items, 10 ) +
		  parseInt( cartTotals.total_items_tax, 10 )
		: parseInt( cartTotals.total_items, 10 );

	return (
		<div
			className={ classNames( className, 'wc-block-mini-cart__footer' ) }
		>
			<TotalsItem
				className="wc-block-mini-cart__footer-subtotal"
				currency={ getCurrencyFromPriceResponse( cartTotals ) }
				label={ __( 'Subtotal', 'woo-gutenberg-products-block' ) }
				value={ subTotal }
				description={ __(
					'Shipping, taxes, and discounts calculated at checkout.',
					'woo-gutenberg-products-block'
				) }
			/>
			<div className="wc-block-mini-cart__footer-actions">
				{ children }
				{ cartButtonLabel && (
					<CartButton cartButtonLabel={ cartButtonLabel } />
				) }
				{ checkoutButtonLabel && (
					<CheckoutButton
						checkoutButtonLabel={ checkoutButtonLabel }
					/>
				) }
			</div>
			<PaymentEventsProvider>
				<PaymentMethodIconsElement />
			</PaymentEventsProvider>
		</div>
	);
};

export default Block;
