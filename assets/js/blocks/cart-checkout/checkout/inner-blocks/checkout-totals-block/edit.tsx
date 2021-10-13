/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Sidebar } from '@woocommerce/base-components/sidebar-layout';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import './style.scss';
import { useForcedLayout } from '../../use-forced-layout';
import { getAllowedBlocks } from '../../editor-utils';
import { useCheckoutBlockContext } from '../../context';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const { showRateAfterTaxName } = useCheckoutBlockContext();
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.CHECKOUT_TOTALS );

	const defaultTemplate = [
		[
			'woocommerce/checkout-order-summary-block',
			{
				showRateAfterTaxName,
			},
			[],
		],
	];

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<Sidebar className="wc-block-checkout__sidebar">
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					templateLock={ false }
					template={ defaultTemplate }
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
