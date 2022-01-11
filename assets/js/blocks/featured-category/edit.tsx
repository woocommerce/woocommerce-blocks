/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';

export const Edit = ( props: unknown ) => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<Block { ...props } />
		</div>
	);
};
