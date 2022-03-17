/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import type { TemplateArray } from '@wordpress/blocks';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { useForcedLayout, getAllowedBlocks } from '../../../shared';
import { OrderMetaSlotFill } from './slotfills';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
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
		[ 'woocommerce/order-summary-total-block', {}, [] ],
	] as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ defaultTemplate }
				templateLock="insert"
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
