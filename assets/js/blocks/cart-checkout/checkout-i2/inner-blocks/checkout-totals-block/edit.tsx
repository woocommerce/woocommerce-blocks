/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Sidebar } from '@woocommerce/base-components/sidebar-layout';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import type { InnerBlockTemplate } from '../../types';
import { useForcedLayout } from '../../use-forced-layout';
import { getRegisteredBlockNamesByParent } from '../../editor-utils';

const ALLOWED_BLOCKS: string[] = [ 'woocommerce/checkout-order-summary-block' ];
const TEMPLATE: InnerBlockTemplate[] = [
	[ 'woocommerce/checkout-order-summary-block', {}, [] ],
];

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const template = useForcedLayout( {
		clientId,
		template: [
			...ALLOWED_BLOCKS,
			...getRegisteredBlockNamesByParent(
				innerBlockAreas.CHECKOUT_TOTALS
			),
		],
	} );
	return (
		<Sidebar className="wc-block-checkout__sidebar">
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ template }
					template={ TEMPLATE }
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
