/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Title from '@woocommerce/base-components/title';
import { withFilteredAttributes } from '@woocommerce/shared-hocs';
import { TotalsFooterItem } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import attributes from './attributes';
import { OrderMetaSlotFill } from './slotfills';

const FrontendBlock = ( {
	children,
	className,
}: {
	children: JSX.Element | JSX.Element[];
	className: string;
} ): JSX.Element | null => {
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<div className={ className }>
			{ children }
			<TotalsFooterItem
				currency={ totalsCurrency }
				values={ cartTotals }
			/>
			<OrderMetaSlotFill />
		</div>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
