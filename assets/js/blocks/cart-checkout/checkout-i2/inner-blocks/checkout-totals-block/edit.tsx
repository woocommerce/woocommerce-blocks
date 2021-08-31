/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Sidebar } from '@woocommerce/base-components/sidebar-layout';
import { getRegisteredBlocks } from '@woocommerce/blocks-checkout';
import { useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */
import type { InnerBlockTemplate } from '../../types';
import { useForcedLayout } from '../../use-forced-layout';

const ALLOWED_BLOCKS: string[] = [ 'woocommerce/checkout-order-summary-block' ];
const TEMPLATE: InnerBlockTemplate[] = [
	[ 'woocommerce/checkout-order-summary-block', {}, [] ],
];

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const registeredBlocks = getRegisteredBlocks( 'totals' );
	const { current: template = [] } = useRef< Array< string > >( [
		...ALLOWED_BLOCKS,
		...registeredBlocks,
	] );
	useForcedLayout( {
		clientId,
		template,
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
