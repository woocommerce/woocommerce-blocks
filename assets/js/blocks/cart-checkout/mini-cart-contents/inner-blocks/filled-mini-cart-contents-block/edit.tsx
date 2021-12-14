/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';
import type { TemplateArray } from '@wordpress/blocks';
import { useEditorContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import { useForcedLayout, getAllowedBlocks } from '../../../shared';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.EMPTY_MINI_CART );
	const { currentView } = useEditorContext();

	const defaultTemplate = ( [
		[ 'woocommerce/mini-cart-title-block', {} ],
		[ 'woocommerce/mini-cart-products-table-block', {} ],
		[ 'woocommerce/mini-cart-footer-block', {} ],
	].filter( Boolean ) as unknown ) as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<div
			{ ...blockProps }
			hidden={
				currentView !== 'woocommerce/filled-mini-cart-contents-block'
			}
		>
			<InnerBlocks
				template={ defaultTemplate }
				allowedBlocks={ allowedBlocks }
				templateLock="insert"
			/>
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
