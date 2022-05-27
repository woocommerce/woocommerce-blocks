/**
 * External dependencies
 */
import { TotalsFooterItem } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
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
	const { onCheckoutValidationBeforeProcessing } = useCheckoutContext();
	const cb = () => {
		return {
			type: 'error',
			errorMessage: 'You aint nothing here',
			validationErrors: 'nothing',
		};
	};

	return (
		<div className={ className }>
			{ children }
			<div className="wc-block-components-totals-wrapper">
				<TotalsFooterItem
					currency={ totalsCurrency }
					values={ cartTotals }
				/>
			</div>
			<div>
				<button
					onClick={ () => {
						onCheckoutValidationBeforeProcessing( cb );
					} }
				>
					Register an observer
				</button>
			</div>
			<OrderMetaSlotFill />
		</div>
	);
};

export default FrontendBlock;
