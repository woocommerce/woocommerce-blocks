/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Sidebar } from '@woocommerce/base-components/sidebar-layout';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';
import type { TemplateArray } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import { useForcedLayout } from '../../use-forced-layout';
import { getAllowedBlocks } from '../../editor-utils';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
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
		<Sidebar className="wc-block-cart__sidebar">
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ defaultTemplate }
					templateLock={ false }
				/>
			</div>
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
