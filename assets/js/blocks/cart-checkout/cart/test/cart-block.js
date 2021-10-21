/**
 * Internal dependencies
 */
import Cart from '../block';

import FilledCart from '../inner-blocks/filled-cart-block/frontend';
import EmptyCart from '../inner-blocks/empty-cart-block/frontend';

import ItemsBlock from '../inner-blocks/cart-items-block/frontend';
import TotalsBlock from '../inner-blocks/cart-totals-block/frontend';

import LineItemsBlock from '../inner-blocks/cart-line-items-block/block.tsx';
import OrderSummaryBlock from '../inner-blocks/cart-order-summary-block/block.tsx';
import ExpressPaymentBlock from '../inner-blocks/cart-express-payment-block/block.tsx';
import ProceedToCheckoutBlock from '../inner-blocks/proceed-to-checkout-block/block.tsx';
import AcceptedPaymentMethodsIcons from '../inner-blocks/cart-accepted-payment-methods-block/block.tsx';

export default function CartBlock( { attributes = {} } ) {
	const {
		showRateAfterTaxName = false,
		isShippingCalculatorEnabled = false,
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
					<ProceedToCheckoutBlock />
					<AcceptedPaymentMethodsIcons />
				</TotalsBlock>
			</FilledCart>
			<EmptyCart>
				<p>Empty Cart</p>
			</EmptyCart>
		</Cart>
	);
}
