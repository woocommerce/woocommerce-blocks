/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';
import { AllReviewsEditorProps } from './types';

export const Edit = ( props: unknown & AllReviewsEditorProps ): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Block { ...props } />
		</div>
	);
};
