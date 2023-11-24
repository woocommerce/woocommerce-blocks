/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { useEditorContext } from '~/base/context';
import { getMiniCartAllowedBlocks } from '../allowed-blocks';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();
	const { currentView } = useEditorContext();

	return (
		<div
			{ ...blockProps }
			hidden={
				currentView !== 'woocommerce/empty-mini-cart-contents-block'
			}
		>
			<InnerBlocks
				allowedBlocks={ getMiniCartAllowedBlocks() }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
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
