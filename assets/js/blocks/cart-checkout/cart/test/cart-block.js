/**
 * Internal dependencies
 */
import Cart from '../block';

import FilledCart from '../inner-blocks/filled-cart-block/frontend';
import EmptyCart from '../inner-blocks/empty-cart-block/frontend';

import ItemsBlock from '../inner-blocks/cart-items-block/frontend';
import TotalsBlock from '../inner-blocks/cart-totals-block/frontend';

import LineItemsBlock from '../inner-blocks/cart-line-items-block/block';
import OrderSummaryBlock from '../inner-blocks/cart-order-summary-block/block';
import ExpressPaymentBlock from '../inner-blocks/cart-express-payment-block/block';
import ProceedToCheckoutBlock from '../inner-blocks/proceed-to-checkout-block/block';
import AcceptedPaymentMethodsIcons from '../inner-blocks/cart-accepted-payment-methods-block/block';

export default function CartBlock( {
	attributes = {
		showRateAfterTaxName: false,
		isShippingCalculatorEnabled: false,
		checkoutPageId: 0,
	},
} ) {
	const {
		showRateAfterTaxName,
		isShippingCalculatorEnabled,
		checkoutPageId,
	} = attributes;
	return (
		<Cart attributes={ attributes }>
			<FilledCart>
				<ItemsBlock>
					<LineItemsBlock />
				</ItemsBlock>
				<TotalsBlock>
					<OrderSummaryBlock
						showRateAfterTaxName={ showRateAfterTaxName }
						isShippingCalculatorEnabled={
							isShippingCalculatorEnabled
						}
					/>
					<ExpressPaymentBlock />
					<ProceedToCheckoutBlock checkoutPageId={ checkoutPageId } />
					<AcceptedPaymentMethodsIcons />
				</TotalsBlock>
			</FilledCart>
			<EmptyCart>
				<p>Empty Cart</p>
			</EmptyCart>
		</Cart>
	);
}
