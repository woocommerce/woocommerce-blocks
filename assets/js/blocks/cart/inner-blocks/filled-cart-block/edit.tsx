/**
 * External dependencies
 */
import classnames from 'classnames';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';
import type { TemplateArray } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { useEditorContext } from '~/base/context';
import { SidebarLayout } from '~/base/components/sidebar-layout';
import {
	useForcedLayout,
	getAllowedBlocks,
} from '../../../cart-checkout-shared';
import './editor.scss';
import { useCartBlockContext } from '../../context';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const { currentView } = useEditorContext();
	const { hasDarkControls } = useCartBlockContext();
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.FILLED_CART );
	const defaultTemplate = [
		[ 'woocommerce/cart-items-block', {}, [] ],
		[ 'woocommerce/cart-totals-block', {}, [] ],
	] as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );
	return (
		<div
			{ ...blockProps }
			hidden={ currentView !== 'woocommerce/filled-cart-block' }
		>
			<SidebarLayout
				className={ classnames( 'wc-block-cart', {
					'has-dark-controls': hasDarkControls,
				} ) }
			>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ defaultTemplate }
					templateLock="insert"
				/>
			</SidebarLayout>
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
