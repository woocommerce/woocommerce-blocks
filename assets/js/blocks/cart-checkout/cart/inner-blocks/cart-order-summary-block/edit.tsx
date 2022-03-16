/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import type { TemplateArray } from '@wordpress/blocks';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import {
	innerBlockAreas,
	ExperimentalOrderMeta,
} from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { useForcedLayout, getAllowedBlocks } from '../../../shared';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const allowedBlocks = getAllowedBlocks(
		innerBlockAreas.CART_ORDER_SUMMARY
	);
	const defaultTemplate = [
		[ 'woocommerce/order-summary-subtotal-block', {}, [] ],
		[ 'woocommerce/order-summary-fee-block', {}, [] ],
		[ 'woocommerce/order-summary-total-block', {}, [] ],
	] as TemplateArray;
	// Prepare props to pass to the ExperimentalOrderMeta slot fill.
	// We need to pluck out receiveCart.
	// eslint-disable-next-line no-unused-vars
	const { extensions, receiveCart, ...cart } = useStoreCart();
	const slotFillProps = {
		extensions,
		cart,
		context: 'woocommerce/cart',
	};

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
			<ExperimentalOrderMeta.Slot { ...slotFillProps } />
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
