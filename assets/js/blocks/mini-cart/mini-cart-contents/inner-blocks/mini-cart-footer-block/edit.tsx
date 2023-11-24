/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { TotalsItem } from '@woocommerce/blocks-components';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { usePaymentMethods, useStoreCart } from '~/base/context/hooks';
import { getIconsFromPaymentMethods } from '~/base/utils';
import { PaymentEventsProvider } from '~/base/context';
import PaymentMethodIcons from '~/base/components/cart-checkout/payment-method-icons';
import './editor.scss';

const PaymentMethodIconsElement = (): JSX.Element => {
	const { paymentMethods } = usePaymentMethods();
	return (
		<PaymentMethodIcons
			icons={ getIconsFromPaymentMethods( paymentMethods ) }
		/>
	);
};

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();
	const { cartTotals } = useStoreCart();
	const subTotal = getSetting( 'displayCartPricesIncludingTax', false )
		? parseInt( cartTotals.total_items, 10 ) +
		  parseInt( cartTotals.total_items_tax, 10 )
		: parseInt( cartTotals.total_items, 10 );

	const TEMPLATE = [
		[ 'woocommerce/mini-cart-cart-button-block', {} ],
		[ 'woocommerce/mini-cart-checkout-button-block', {} ],
	];

	return (
		<div { ...blockProps }>
			<div className="wc-block-mini-cart__footer">
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
					<InnerBlocks template={ TEMPLATE } />
				</div>
				<PaymentEventsProvider>
					<PaymentMethodIconsElement />
				</PaymentEventsProvider>
			</div>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
