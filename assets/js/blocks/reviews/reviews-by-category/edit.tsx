/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Editor from './block';
import { ReviewsByCategoryEditorProps } from './types';

export const Edit = (
	props: unknown & ReviewsByCategoryEditorProps
): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Editor { ...props } />
		</div>
	);
};
