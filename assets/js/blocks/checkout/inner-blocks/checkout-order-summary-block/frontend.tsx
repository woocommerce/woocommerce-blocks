/**
 * External dependencies
 */
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';
import { TotalsFooterItem } from '~/base/components/cart-checkout';
import { OrderMetaSlotFill } from './slotfills';

const FrontendBlock = ( {
	children,
	className = '',
}: {
	children: JSX.Element | JSX.Element[];
	className?: string;
} ): JSX.Element | null => {
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<div className={ className }>
			{ children }
			<div className="wc-block-components-totals-wrapper">
				<TotalsFooterItem
					currency={ totalsCurrency }
					values={ cartTotals }
				/>
			</div>
			<OrderMetaSlotFill />
		</div>
	);
};

export default FrontendBlock;
