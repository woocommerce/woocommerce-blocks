/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEditorContext } from '@woocommerce/base-context';
import { getBlockTypes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

const excludedBlocks = [
	'woocommerce/mini-cart',
	'core/template-part',
	'core/post-template',
	'core/comment-template',
];

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();
	const { currentView } = useEditorContext();
	const allowedBlocks = [
		...getBlockTypes()
			.filter( ( block ) => {
				if ( excludedBlocks.includes( block.name ) ) {
					return false;
				}

				if ( block.parent && block.parent.length > 0 ) {
					return false;
				}

				return true;
			} )
			.map( ( { name } ) => name ),
	];

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
