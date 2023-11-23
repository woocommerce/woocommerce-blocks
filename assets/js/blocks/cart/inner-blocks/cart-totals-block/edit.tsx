/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';
import type { TemplateArray } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Sidebar } from '~/base/components/sidebar-layout';
import {
	useForcedLayout,
	getAllowedBlocks,
} from '../../../cart-checkout-shared';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps( { className: 'wc-block-cart__sidebar' } );
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.CART_TOTALS );
	const defaultTemplate = [
		[ 'woocommerce/cart-order-summary-block', {}, [] ],
		[ 'woocommerce/cart-express-payment-block', {}, [] ],
		[ 'woocommerce/proceed-to-checkout-block', {}, [] ],
		[ 'woocommerce/cart-accepted-payment-methods-block', {}, [] ],
	] as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<Sidebar { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ defaultTemplate }
				templateLock={ false }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</Sidebar>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
