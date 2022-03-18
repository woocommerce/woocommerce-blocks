/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import type { TemplateArray } from '@wordpress/blocks';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';
import { __ } from '@wordpress/i18n';
import Title from '@woocommerce/base-components/title';
import { TotalsFooterItem } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import { useForcedLayout, getAllowedBlocks } from '../../../shared';
import { OrderMetaSlotFill } from './slotfills';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );
	const allowedBlocks = getAllowedBlocks(
		innerBlockAreas.CART_ORDER_SUMMARY
	);
	const defaultTemplate = [
		[ 'woocommerce/order-summary-subtotal-block', {}, [] ],
		[ 'woocommerce/order-summary-fee-block', {}, [] ],
		[ 'woocommerce/order-summary-discount-block', {}, [] ],
		[ 'woocommerce/order-summary-coupon-form-block', {}, [] ],
		[ 'woocommerce/order-summary-shipping-block', {}, [] ],
		[ 'woocommerce/order-summary-taxes-block', {}, [] ],
	] as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<div { ...blockProps }>
			<Title headingLevel="2" className="wc-block-cart__totals-title">
				{ __( 'Cart totals', 'woo-gutenberg-products-block' ) }
			</Title>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ defaultTemplate }
			/>
			<TotalsFooterItem
				currency={ totalsCurrency }
				values={ cartTotals }
			/>
			<OrderMetaSlotFill />
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
