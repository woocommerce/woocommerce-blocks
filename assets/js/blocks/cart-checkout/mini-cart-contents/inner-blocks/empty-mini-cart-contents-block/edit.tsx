/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEditorContext } from '@woocommerce/base-context';
import { getBlockTypes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

const EXCLUDED_BLOCKS: readonly string[] = [
	'woocommerce/mini-cart',
	'core/template-part',
	'core/post-template',
	'core/comment-template',
];

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();
	const { currentView } = useEditorContext();
	const allowedBlocks = getBlockTypes()
		.filter( ( block ) => {
			if ( EXCLUDED_BLOCKS.includes( block.name ) ) {
				return false;
			}

			return true;
		} )
		.map( ( { name } ) => name );

	return (
		<div
			{ ...blockProps }
			hidden={
				currentView !== 'woocommerce/empty-mini-cart-contents-block'
			}
		>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
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
